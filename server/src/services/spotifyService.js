import axios from 'axios';

/**
 * Basit client_credentials token örneği
 * (sadece public data çekmek için)
 */
async function getClientToken() {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const resp = await axios.post(tokenUrl, null, {
    params: { grant_type: 'client_credentials' },
    auth: {
      username: process.env.SPOTIFY_CLIENT_ID,
      password: process.env.SPOTIFY_CLIENT_SECRET
    }
  });
  return resp.data.access_token;
}

/**
 * Örnek: "DE" & "pop,rock" => 5 şarkı
 */
export async function getRandomSongs({ market='DE', genres=['pop','rock'], limit=5 }) {
  const accessToken = await getClientToken();
  const url = `https://api.spotify.com/v1/recommendations?limit=${limit}&market=${market}&seed_genres=${genres.join(',')}`;
  try {
    const resp = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return resp.data.tracks; 
    // tracks dizisi -> her track icin name, artists, preview_url, ...
  } catch (err) {
    console.error('getRandomSongs error:', err);
    return [];
  }
}