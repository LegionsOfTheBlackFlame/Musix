import express from 'express';
import { updateScore, getTopScores } from '../controllers/scoreboardController.js';

const router = express.Router();

// POST /score/update => skor güncelle
router.post('/update', updateScore);

// GET /score/top => en iyi 10 skor
router.get('/top', getTopScores);

export default router;