const { Warehouse } = require('../models');

const getWarehouses = async (req, res) => {
  try {
    const data = await Warehouse.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createWarehouse = async (req, res) => {
  try {
    const data = await Warehouse.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getWarehouses, createWarehouse };
