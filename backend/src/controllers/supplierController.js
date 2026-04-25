const { Supplier } = require('../models');

const getSuppliers = async (req, res) => {
  try {
    const data = await Supplier.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSupplier = async (req, res) => {
  try {
    const data = await Supplier.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSuppliers, createSupplier };
