import axios from 'axios';
import { User } from '../models/User.js';

/**
 * 1) Kullanıcıyı Spotify login sayfasına yönlendirir
 */
export const spotifyLogin = (req, res) => {
  console.log('SPOTIFY_REDIRECT_URI:', process.env.SPOTIFY_REDIRECT_URI);
  const scope = 'user-read-email user-read-private'; 
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const state = 'randomState123'; // Üretimde secure random

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code`
    + `&client_id=${clientId}`
    + `&redirect_uri=${encodeURIComponent(redirectUri)}`
    + `&scope=${encodeURIComponent(scope)}`
    + `&state=${state}`;

  // Kullanıcıyı Spotify auth sayfasına yönlendir
  res.redirect(spotifyAuthUrl);
};

/**
 * 2) Spotify, yetki verince /auth/spotifyCallback'e "code" ile döner.
 *    code'u token'a çevirip user profile alır, DB'de kaydeder
 */
export const spotifyCallback = async (req, res) => {
  const code = req.query.code || null;
  if (!code) return res.status(400).send('No code provided');

  try {
    // 2a) code'u token'a çevir
    const tokenUrl = 'https://accounts.spotify.com/api/token';

    const resp = await axios.post(tokenUrl, null, {
      params: {
        code,
        redirect_uri: encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI),        grant_type: 'authorization_code'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: process.env.SPOTIFY_CLIENT_ID,
        password: process.env.SPOTIFY_CLIENT_SECRET
      }
    });

    const { access_token, refresh_token } = resp.data;

    // 2b) user profile çek
    const userProfileResp = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    const { id, display_name, images, country } = userProfileResp.data;

    // 2c) MongoDB'de user kaydı (upsert)
    let user = await User.findOne({ spotifyId: id });
    if (!user) {
      user = new User({
        spotifyId: id,
        displayName: display_name,
        profileImg: images?.[0]?.url || null,
        country: country || 'Unknown'
      });
      await user.save();
    } else {
      user.displayName = display_name;
      user.profileImg = images?.[0]?.url || user.profileImg;
      user.country = country || user.country;
      await user.save();
    }

    // 2d) session'a userId kaydet
    req.session.userId = user._id;
    
    // prod'da: token saklama veya jwt olabilir
    // demo: session userId yeterli

    // 2e) Frontend'e redirect
    return res.redirect('http://localhost:3000'); 
    // ya da res.json(...) ile response
  } catch (err) {
    console.error('spotifyCallback error:', err);
    return res.status(500).send('Spotify auth failed');
  }
};