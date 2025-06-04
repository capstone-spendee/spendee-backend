const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createPrediction, getUserPredictions } = require('../controllers/predictionController');

router.post('/simpan', auth, createPrediction);
router.get('/history/:userId', auth, getUserPredictions);

module.exports = router;
