/**
 * Team Project - Full Stack Application
 * Team Members:
 * Adam Jama
 * Ricardo Sylvestre
 * Elmotasembella Riyani
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: true
  },
  storeName: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);