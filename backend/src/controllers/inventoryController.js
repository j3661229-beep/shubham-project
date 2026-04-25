const { Inventory, Product } = require('../models');

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll({
      include: [{ model: Product, attributes: ['name', 'category'] }]
    });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInventory = async (req, res) => {
  try {
    const { product_id, quantity, warehouse_id } = req.body;
    let inventoryItem = await Inventory.findOne({ where: { product_id, warehouse_id } });

    if (inventoryItem) {
      inventoryItem.quantity = quantity;
      await inventoryItem.save();
    } else {
      inventoryItem = await Inventory.create({ product_id, quantity, warehouse_id });
    }

    res.json(inventoryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getInventory, updateInventory };
