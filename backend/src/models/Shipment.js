const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Order = require('./Order');

const Shipment = sequelize.define('Shipment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('Pending', 'In Transit', 'Delivered'),
    defaultValue: 'Pending',
  },
  location_lat: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  location_lng: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  eta: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Shipment;
