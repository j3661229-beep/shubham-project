const express = require('express');
const { getSuppliers, createSupplier } = require('../controllers/supplierController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getSuppliers)
  .post(protect, createSupplier);

module.exports = router;
