const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addHistory, getHistory } = require('../controllers/historyController');

router.post('/', auth, addHistory);
router.get('/', auth, getHistory);

module.exports = router;
