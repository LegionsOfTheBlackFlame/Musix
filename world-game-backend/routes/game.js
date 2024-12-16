const express = require('express');
const router = express.Router();

let scores = []; // Geçici olarak skorları saklamak için

router.get('/scores', (req, res) => {
  res.json(scores);
});

router.post('/scores', (req, res) => {
  const { username, score } = req.body;
  scores.push({ username, score });
  res.json({ message: 'Skor başarıyla kaydedildi.' });
});

module.exports = router;