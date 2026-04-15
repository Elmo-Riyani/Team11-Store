/**
 * Team Project - Full Stack Application
 * Team Members:
 * Adam Jama
 * Ricardo Sylvestre
 * Elmotasembella Riyani
 */

const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../Controllers/productController');

// CREATE
router.post('/', createProduct);

// GET ALL
router.get('/', getAllProducts);

// GET BY ID
router.get('/:id', getProductById);

// UPDATE
router.put('/:id', updateProduct);

// DELETE
router.delete('/:id', deleteProduct);

module.exports = router;