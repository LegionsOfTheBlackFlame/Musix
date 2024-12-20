const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fs = require('fs');

// Ortam değişkenlerini yükle
dotenv.config();

// Çevre değişkenlerini kontrol et
const requiredEnvVars = ['MONGO_URI', 'SPOTIFY_CLIENT_ID', 'SPOTIFY_CLIENT_SECRET'];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingVars.length > 0) {
  console.error(`missing environment variable: ${missingVars.join(', ')}`);
  process.exit(1);
}

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production'
      ? ['https://your-production-site.com']
      : ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// Geliştirme ortamı için middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(require('morgan')('dev'));
}

// Veritabanı bağlantısı
connectDB().catch((err) => {
  console.error(`Veritabanı Bağlantı Hatası: ${err.message}`);
  process.exit(1);
});

// Kök rota tanımı
app.get('/', (req, res) => {
  res.json({
    message: "API çalışıyor!",
    version: "1.0.0",
    status: "healthy",
  });
});

// Dinamik rota yükleyici
const routesPath = './routes';
if (fs.existsSync(routesPath)) {
  fs.readdirSync(routesPath).forEach((file) => {
    const route = `${routesPath}/${file}`;
    app.use(`/api/${file.split('.')[0]}`, require(route));
  });
} else {
  console.error('Routes directory not found!');
  process.exit(1);
}

// Hata yönetimi middleware'i
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Bir hata oluştu!',
  });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor.`);
  console.log(`🌍 Çalışma ortamı: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/`);
});