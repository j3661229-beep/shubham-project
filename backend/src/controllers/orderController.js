const { Order, DemandData, Inventory, Shipment, sequelize } = require('../models');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id;

    // Check inventory
    const inventory = await Inventory.findOne({ where: { product_id }, transaction });
    if (!inventory || inventory.quantity < quantity) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Insufficient inventory' });
    }

    // Decrement inventory
    inventory.quantity -= quantity;
    await inventory.save({ transaction });

    // Create order
    const order = await Order.create({ user_id, product_id, quantity, status: 'Pending' }, { transaction });

    // Log demand
    await DemandData.create({ product_id, quantity }, { transaction });

    // Create default shipment
    await Shipment.create({ order_id: order.id, status: 'Pending' }, { transaction });

    await transaction.commit();
    res.status(201).json(order);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getOrders, createOrder };
