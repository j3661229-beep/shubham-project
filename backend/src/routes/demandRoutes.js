const express = require('express');
const { getDemandHistory, predictDemand } = require('../controllers/demandController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, authorize('Admin', 'Supplier'), getDemandHistory);

router.route('/predict')
  .post(protect, authorize('Admin', 'Supplier'), predictDemand);

module.exports = router;
