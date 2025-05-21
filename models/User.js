const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: '' }, // bisa diubah
  email: { type: String, required: true, unique: true }, // dari register
  profilePic: { type: String, default: '' }
});


module.exports = mongoose.model('User', userSchema);
