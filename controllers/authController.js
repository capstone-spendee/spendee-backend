const User = require('../models/User');
const bcrypt = require('bcryptjs');
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
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
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
    const user = await User.findById(req.user.id);

    if (!user.profilePic) {
      return res.status(400).json({ message: 'No profile picture to delete' });
    }

    const filePath = path.join(__dirname, '..', user.profilePic);

    // Hapus file di sistem
    fs.unlink(filePath, async (err) => {
      if (err && err.code !== 'ENOENT') {
        return res.status(500).json({ message: 'Failed to delete file' });
      }

      user.profilePic = '';
      await user.save();

      res.json({ message: 'Profile picture deleted' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete profile picture' });
  }
};
