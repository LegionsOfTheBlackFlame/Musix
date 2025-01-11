import express from 'express';
import { spotifyLogin, spotifyCallback } from '../controllers/authController.js';

const router = express.Router();

// /auth/spotifyLogin => Spotify'a yönlendirme
router.get('/spotifyLogin', spotifyLogin);

// /auth/spotifyCallback => code'u al, token, profil, DB
router.get('/spotifyCallback', spotifyCallback);

export default router;