/**
 * Team Project - Full Stack Application
 * Team Members:
 * Adam Jama
 * Ricardo Sylvestre
 * Elmotasembella Riyani
 */

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config({ quiet: true });

const app = express();

app.set('json spaces', 2);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.log(error));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;