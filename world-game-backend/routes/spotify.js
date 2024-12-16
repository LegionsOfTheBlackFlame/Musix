const express = require('express');
const axios = require('axios');
const router = express.Router();

// Spotify OAuth Login Endpoint
router.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email';
  const redirectUri = `${process.env.BACKEND_URL}/api/spotify/callback`;
  const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  res.redirect(spotifyUrl);
});

// Spotify Callback Endpoint
router.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    // Access Token Request
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${process.env.BACKEND_URL}/api/spotify/callback`,
      },
    });

    const { access_token } = response.data;

    // Kullanıcı Bilgilerini Al
    const userInfo = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Frontend'e yönlendirme
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectUri = `${frontendUrl}?user=${encodeURIComponent(
      JSON.stringify(userInfo.data)
    )}`;
    console.log(`Redirecting to: ${redirectUri}`);
    res.redirect(redirectUri);
  } catch (err) {
    console.error('Spotify Callback Hatası:', err.message);
    res.status(500).json({ message: 'Spotify OAuth başarısız oldu.' });
  }
});

// General Token Endpoint (Client Credentials)
router.get('/token', async (req, res) => {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      params: {
        grant_type: 'client_credentials',
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error('Spotify Token Hatası:', err.message);
    res.status(500).json({ message: 'Spotify Token alınırken hata oluştu.' });
  }
});

module.exports = router;