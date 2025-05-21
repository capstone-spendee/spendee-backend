const History = require('../models/History');

exports.addHistory = async (req, res) => {
  const history = new History({ userId: req.user.id, action: req.body.action });
  await history.save();
  res.status(201).json({ message: 'History saved' });
};

exports.getHistory = async (req, res) => {
  const history = await History.find({ userId: req.user.id }).sort({ timestamp: -1 });
  res.json(history);
};
