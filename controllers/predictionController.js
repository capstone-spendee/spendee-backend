const Prediction = require('../models/Prediction');

exports.createPrediction = async (req, res) => {
  try {
    const { nama, email, kategori, formData, status } = req.body;
    const userId = req.user.id;

    const newPrediction = new Prediction({
      userId,
      nama,
      email,
      kategori,
      formData,
      status
    });

    await newPrediction.save();
    res.status(201).json({ message: 'Prediction saved', data: newPrediction });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save prediction', error: err.message });
  }
};

exports.getUserPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(predictions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get predictions', error: err.message });
  }
};
