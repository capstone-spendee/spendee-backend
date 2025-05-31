const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  kategori: {
    type: String,
    enum: ['startup', 'personal'], // hanya dua opsi
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', predictionSchema);
