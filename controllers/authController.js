const User = require('../models/User');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      name: username, // auto-set nama
      email // ditambahkan dari input
    });

    await user.save();

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: 'Register failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
  res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic || null,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const profilePic = req.file?.path; // path dari multer (jika upload foto)

  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(profilePic && { profilePic })
      },
      { new: true }
    );
    res.json({ message: 'Profile updated', user: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

exports.deleteProfilePic = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    if (!user.profilePic) {
      return res.status(400).json({ message: "User belum memiliki foto profil" });
    }

    // Ambil nama file dari "uploads/filename.jpg"
    const filename = path.basename(user.profilePic);
    const filePath = path.join(__dirname, '..', 'uploads', filename);

    // Cek dan hapus file jika ada
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Hapus dari database
    user.profilePic = null;
    await user.save();

    res.status(200).json({ message: "Foto profil berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus foto", error: err.message });
  }
};
