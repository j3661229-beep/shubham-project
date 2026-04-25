const { sequelize } = require('../config/db');
const User = require('./User');
const Product = require('./Product');
const Inventory = require('./Inventory');
const Order = require('./Order');
const DemandData = require('./DemandData');
const Prediction = require('./Prediction');
const Shipment = require('./Shipment');
const Category = require('./Category');
const Warehouse = require('./Warehouse');
const Supplier = require('./Supplier');
const PurchaseOrder = require('./PurchaseOrder');
const AuditLog = require('./AuditLog');
const Customer = require('./Customer');

// Define associations
Customer.hasMany(Order, { foreignKey: 'customer_id' });
Order.belongsTo(Customer, { foreignKey: 'customer_id' });

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Warehouse.hasMany(Inventory, { foreignKey: 'warehouse_id' });
Inventory.belongsTo(Warehouse, { foreignKey: 'warehouse_id' });

Supplier.hasMany(PurchaseOrder, { foreignKey: 'supplier_id' });
PurchaseOrder.belongsTo(Supplier, { foreignKey: 'supplier_id' });

User.hasMany(AuditLog, { foreignKey: 'user_id' });
AuditLog.belongsTo(User, { foreignKey: 'user_id' });

Product.hasMany(Inventory, { foreignKey: 'product_id' });
Inventory.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(Order, { foreignKey: 'product_id' });
Order.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(DemandData, { foreignKey: 'product_id' });
DemandData.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(Prediction, { foreignKey: 'product_id' });
Prediction.belongsTo(Product, { foreignKey: 'product_id' });

Order.hasOne(Shipment, { foreignKey: 'order_id' });
Shipment.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = {
  sequelize,
  User,
  Product,
  Inventory,
  Order,
  DemandData,
  Prediction,
  Shipment,
  Category,
  Warehouse,
  Supplier,
  PurchaseOrder,
  AuditLog,
  Customer
};
