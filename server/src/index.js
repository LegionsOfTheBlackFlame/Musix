import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db.js';

// Import Routes
import authRoutes from './routes/auth.js';
import scoreboardRoutes from './routes/scoreboard.js';
import userRoutes from './routes/user.js';

const app = express();
app.use(express.json());

// CORS ayarları: (frontend http://localhost:3000 ise)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// MongoDB Bağlantısı
connectDB();

// Rotalar
app.use('/auth', authRoutes);
app.use('/score', scoreboardRoutes);
app.use('/user', userRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});