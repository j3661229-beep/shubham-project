const { PurchaseOrder, Supplier } = require('../models');

const getPurchaseOrders = async (req, res) => {
  try {
    const data = await PurchaseOrder.findAll({ include: [Supplier] });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPurchaseOrder = async (req, res) => {
  try {
    const data = await PurchaseOrder.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPurchaseOrders, createPurchaseOrder };
