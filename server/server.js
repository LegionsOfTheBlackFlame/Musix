// Çevresel değişkenleri yüklemek için dotenv modülünü kullanıyoruz
require('dotenv').config();

// Gerekli modülleri dahil ediyoruz
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();
const port = 3100; // Spotify kimlik doğrulama işlemi için 3100 portunu kullanıyoruz

// Çevresel değişkenlerin yüklendiğini doğrulamak için konsola yazdırıyoruz
console.log('Redirect URI:', process.env.REDIRECT_URI);
console.log('Client ID:', process.env.CLIENT_ID);
console.log('Client Secret:', process.env.CLIENT_SECRET);

// Spotify ile giriş için yetkilendirme isteği
app.get('/login', (req, res) => {
    const scope = 'user-read-email user-read-private';
    const authUrl = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            client_id: process.env.CLIENT_ID,
            response_type: 'code',
            redirect_uri: process.env.REDIRECT_URI,
            scope: scope,
        });

    res.redirect(authUrl); // Kullanıcıyı Spotify giriş sayfasına yönlendirir
});

// Spotify'dan dönen yetkilendirme kodunu işler ve kullanıcı bilgilerini alır
app.get('/callback', async (req, res) => {
    const code = req.query.code || null;

    try {
        // Yetkilendirme kodunu access token'a çevirme isteği
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.REDIRECT_URI,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = tokenResponse.data.access_token;

        // Kullanıcı bilgilerini almak için Spotify API'sini çağırır
        const userProfile = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const userID = userProfile.data.id;
        const userImage = userProfile.data.images[0]?.url;  // Profil fotoğrafı URL'si
            console.log(userProfile);
        // Kullanıcı bilgilerini aldıktan sonra 3000 portuna yönlendir
        res.redirect(`http://localhost:3000?userID=${userID}&userImage=${encodeURIComponent(userImage || '')}`);
    } catch (error) {
        console.error('Hata:', error);
        res.send("Bir hata oluştu.");
    }
});

// Sunucuyu belirtilen port üzerinde başlatır
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
