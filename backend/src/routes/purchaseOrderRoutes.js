const express = require('express');
const { getPurchaseOrders, createPurchaseOrder } = require('../controllers/purchaseOrderController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getPurchaseOrders)
  .post(protect, createPurchaseOrder);

module.exports = router;
