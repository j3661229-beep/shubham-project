const { Shipment, Order } = require('../models');

const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.findAll({
      include: [{ model: Order }]
    });
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateShipment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location_lat, location_lng, eta } = req.body;
    
    const shipment = await Shipment.findByPk(id);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    shipment.status = status || shipment.status;
    shipment.location_lat = location_lat || shipment.location_lat;
    shipment.location_lng = location_lng || shipment.location_lng;
    shipment.eta = eta || shipment.eta;

    await shipment.save();

    // If shipment delivered, update order status
    if (status === 'Delivered') {
      const order = await Order.findByPk(shipment.order_id);
      if (order) {
        order.status = 'Delivered';
        await order.save();
      }
    }

    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getShipments, updateShipment };
