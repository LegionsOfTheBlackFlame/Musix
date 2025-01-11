import { Scoreboard } from '../models/Scoreboard.js';

/**
 * Kullanıcı skorunu günceller
 */
export const updateScore = async (req, res) => {
  try {
    const userId = req.session.userId; 
    if (!userId) return res.status(401).json({ error: 'Not logged in' });

    const { newScore } = req.body;
    if (newScore == null) return res.status(400).json({ error: 'No score provided' });

    let scoreDoc = await Scoreboard.findOne({ user: userId });
    if (!scoreDoc) {
      scoreDoc = new Scoreboard({ user: userId, score: newScore });
    } else {
      // best score mantığı
      if (newScore > scoreDoc.score) {
        scoreDoc.score = newScore;
      }
      scoreDoc.updatedAt = new Date();
    }
    await scoreDoc.save();

    return res.json({ message: 'Score updated', score: scoreDoc.score });
  } catch (err) {
    console.error('updateScore error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * En yüksek 10 skoru döner
 */
export const getTopScores = async (req, res) => {
  try {
    const tops = await Scoreboard.find({})
      .sort({ score: -1 })
      .limit(10)
      .populate('user', 'displayName profileImg'); 
      // user alanında 'displayName', 'profileImg' getirecek
    return res.json(tops);
  } catch (err) {
    console.error('getTopScores error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};