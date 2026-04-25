const express = require('express');
const { getShipments, updateShipment } = require('../controllers/shipmentController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getShipments);

router.route('/:id/update')
  .put(protect, authorize('Admin', 'Warehouse Manager', 'Supplier'), updateShipment);

module.exports = router;
