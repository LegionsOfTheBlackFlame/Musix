// Çevresel değişkenleri yüklemek için dotenv modülünü kullanıyoruz
require('dotenv').config();
const myData = require('./data/dataHero.js');

// Gerekli modülleri dahil ediyoruz
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const querystring = require('querystring');
const { message } = require('statuses');

const app = express();
const port = 3100; // Spotify kimlik doğrulama işlemi için 3100 portunu kullanıyoruz

// Çevresel değişkenlerin yüklendiğini doğrulamak için konsola yazdırıyoruz
console.log('Redirect URI:', process.env.REDIRECT_URI);
console.log('Client ID:', process.env.CLIENT_ID);
console.log('Client Secret:', process.env.CLIENT_SECRET);

app.use(cors());

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
    const code = req.query.code;

    if (!code) {
        return res.send("Yetkilendirme kodu bulunamadı.");
    }

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
        const userImage = userProfile.data.images[0]?.url || '';  // Profil fotoğrafı URL'si

        res.redirect(`http://localhost:3000?userID=${encodeURIComponent(userID)}&userImage=${encodeURIComponent(userImage)}&accessToken=${encodeURIComponent(accessToken)}`);
    } catch (error) {
        console.error('Hata:', error.response?.data || error.message);
        res.redirect(`http://localhost:3000?error=Bir hata oluştu.`);
    }
});

// Rastgele şarkı almak için endpoint
app.get('/song', async (req, res) => {
    const accessToken = req.query.accessToken;

    if (!accessToken) {
        return res.json({ error: "Access token bulunamadı." });
    }

    try {
        // Rastgele bir ülke belirle
        const countries = ['CA', 'US', 'RU', 'GB', 'BR'];
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];

        // Rastgele bir şarkıyı almak için Spotify API'sini kullanır
        const trackResponse = await axios.get('https://api.spotify.com/v1/recommendations', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                seed_genres: 'pop',
                limit: 1,
                market: randomCountry
            }
        });

        if (trackResponse.data.tracks.length === 0) {
            return res.json({ error: "Şarkı bulunamadı." });
        }

        const track = trackResponse.data.tracks[0];
        const songName = track.name;
        const artistName = track.artists.map(artist => artist.name).join(', ');
        const previewUrl = track.preview_url || '';

        // Şarkı bilgilerini JSON olarak döndür
        res.json({
            songName,
            artistName,
            previewUrl,
            country: randomCountry
        });
    } catch (error) {
        console.error('Hata:', error.response?.data || error.message);
        res.json({ error: "Bir hata oluştu." });
    }
});

app.get(`/data`, async (req, res) => {
    res.json({ message: "this is data", data: myData});
});

// Sunucuyu belirtilen port üzerinde başlatır
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
 