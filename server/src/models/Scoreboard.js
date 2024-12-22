import mongoose from 'mongoose';

const scoreboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

export const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema);