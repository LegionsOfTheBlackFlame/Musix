import { User } from '../models/User.js';

/**
 * Oturum açmış kullanıcının profili
 */
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Not logged in' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // profil resmi yoksa default ver
    const profileImg = user.profileImg || 'https://example.com/default_user.png';

    return res.json({
      displayName: user.displayName,
      profileImg,
      spotifyId: user.spotifyId,
      country: user.country
    });
  } catch (err) {
    console.error('getMyProfile error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};