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
/// Ülkeler ve ISO kodları
const countryCodeMap = {
    "United States": "US",
    "Canada": "CA",
    "Brazil": "BR",
    "Mexico": "MX",
    "Argentina": "AR",
    "Colombia": "CO",
    "Chile": "CL",
    "Peru": "PE",
    "Venezuela": "VE",
    "Cuba": "CU",
    "Uruguay": "UY",
    "Paraguay": "PY",
    "Bolivia": "BO",
    "Ecuador": "EC",
    "Panama": "PA",
    "Costa Rica": "CR",
    "Guatemala": "GT",
    "Honduras": "HN",
    "El Salvador": "SV",
    "Jamaica": "JM",
    "Germany": "DE",
    "France": "FR",
    "United Kingdom": "GB",
    "Italy": "IT",
    "Spain": "ES",
    "Russia": "RU",
    "Netherlands": "NL",
    "Belgium": "BE",
    "Sweden": "SE",
    "Poland": "PL",
    "Austria": "AT",
    "Denmark": "DK",
    "Norway": "NO",
    "Ireland": "IE",
    "Portugal": "PT",
    "Switzerland": "CH",
    "Finland": "FI",
    "Greece": "GR",
    "Czech Republic": "CZ",
    "Hungary": "HU",
    "China": "CN",
    "India": "IN",
    "Japan": "JP",
    "South Korea": "KR",
    "Indonesia": "ID",
    "Thailand": "TH",
    "Vietnam": "VN",
    "Malaysia": "MY",
    "Philippines": "PH",
    "Saudi Arabia": "SA",
    "United Arab Emirates": "AE",
    "Israel": "IL",
    "Turkey": "TR",
    "Pakistan": "PK",
    "Bangladesh": "BD",
    "Iran": "IR",
    "Iraq": "IQ",
    "Singapore": "SG",
    "Nepal": "NP",
    "Sri Lanka": "LK",
    "Nigeria": "NG",
    "Ethiopia": "ET",
    "Egypt": "EG",
    "South Africa": "ZA",
    "Kenya": "KE",
    "Algeria": "DZ",
    "Sudan": "SD",
    "Morocco": "MA",
    "Ghana": "GH",
    "Uganda": "UG",
    "Angola": "AO",
    "Mozambique": "MZ",
    "Tanzania": "TZ",
    "Cameroon": "CM",
    "Ivory Coast": "CI",
    "Senegal": "SN",
    "Zambia": "ZM",
    "Mali": "ML",
    "Zimbabwe": "ZW",
    "Tunisia": "TN"
  };
  
  // Rastgele bir kıta ve ülkeden şarkı almak için güncel endpoint
  app.get('/game/song/random', async (req, res) => {
      const { accessToken, difficulty, count = 1 } = req.query;
  
      if (!accessToken) {
          return res.status(400).json({ error: "Access token bulunamadı." });
      }
  
      if (!difficulty) {
          return res.status(400).json({ error: "Zorluk seviyesi belirtilmelidir." });
      }
  
      try {
          // Zorluk seviyesini popülerlik aralığına çevir
          let popularityRange;
          switch (difficulty.toLowerCase()) {
              case 'easy':
                  popularityRange = [80, 100];
                  break;
              case 'medium':
                  popularityRange = [50, 80];
                  break;
              case 'hard':
                  popularityRange = [0, 50];
                  break;
              default:
                  return res.status(400).json({ error: "Geçersiz zorluk seviyesi." });
          }
  
          // Rastgele bir kıta ve ülkeden seçim yap
          const continents = Object.keys(countries);
          const randomContinent = continents[Math.floor(Math.random() * continents.length)];
          const randomCountry = countries[randomContinent][Math.floor(Math.random() * countries[randomContinent].length)];
          const marketCode = countryCodeMap[randomCountry];
  
          if (!marketCode) {
              return res.status(400).json({ error: `Ülke kodu bulunamadı: ${randomCountry}` });
          }
  
          // Spotify'dan şarkı çekme isteği
          const trackResponse = await axios.get('https://api.spotify.com/v1/recommendations', {
              headers: {
                  'Authorization': `Bearer ${accessToken}`
              },
              params: {
                  seed_genres: 'pop', // Örnek için pop türü
                  limit: count,       // Kullanıcının belirttiği sayıda şarkı
                  market: marketCode, // Rastgele seçilen ülkenin ISO kodu
                  min_popularity: popularityRange[0],
                  max_popularity: popularityRange[1]
              }
          });
  
          if (!trackResponse.data.tracks || trackResponse.data.tracks.length === 0) {
              return res.json({ error: "Şarkı bulunamadı." });
          }
  
          // Şarkı bilgilerini düzenle
          const tracks = trackResponse.data.tracks.map(track => ({
              songName: track.name,
              artistName: track.artists.map(artist => artist.name).join(', '),
              previewUrl: track.preview_url || '',
              popularity: track.popularity,
              continent: randomContinent,
              country: randomCountry
          }));
  
          res.json({ tracks });
      } catch (error) {
          console.error('Hata:', error.response?.data || error.message);
          res.status(500).json({ error: "Spotify API ile iletişimde bir sorun oluştu." });
      }
  });
  
  // Kıtaları ve ülkeleri döndüren endpoint
  app.get('/game/countries', (req, res) => {
      res.json(countries);
  });

app.get(`/data`, async (req, res) => {
    res.json({ message: "this is data", data: myData});
});

// Sunucuyu belirtilen port üzerinde başlatır
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
 