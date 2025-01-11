import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  spotifyId: { type: String, unique: true, required: true },
  displayName: String,
  profileImg: String,
  country: String,
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);