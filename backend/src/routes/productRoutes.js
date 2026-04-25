const express = require('express');
const { getProducts, createProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getProducts)
  .post(protect, authorize('Admin', 'Supplier'), createProduct);

module.exports = router;
