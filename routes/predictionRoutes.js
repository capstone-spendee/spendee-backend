const express = require('express');
const router = express.Router();
const { createPrediction, getUserPredictions } = require('../controllers/predictionController');
const auth = require('../middleware/authMiddleware');

router.post('/predictions', auth, createPrediction);
router.get('/predictions/history', auth, getUserPredictions);

module.exports = router;
