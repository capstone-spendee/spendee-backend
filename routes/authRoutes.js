const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { register, login, updateProfile, deleteProfilePic } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.put('/profile', auth, upload.single('profilePic'), updateProfile); // upload.single('profilePic') untuk upload foto
router.delete('/profile-pic', auth, deleteProfilePic); // hapus foto profil

module.exports = router;
