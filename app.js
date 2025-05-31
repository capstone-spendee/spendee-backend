require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/authRoutes'));
app.use('/uploads', express.static('uploads')); // untuk mengakses file upload
app.use('/api/predictions', require('./routes/predictionRoutes'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
