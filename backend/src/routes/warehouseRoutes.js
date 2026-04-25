const express = require('express');
const { getWarehouses, createWarehouse } = require('../controllers/warehouseController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getWarehouses)
  .post(protect, createWarehouse);

module.exports = router;
