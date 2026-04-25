const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Product = require('./Product');

const Prediction = sequelize.define('Prediction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  predicted_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Prediction;
