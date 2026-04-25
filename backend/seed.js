const bcrypt = require('bcrypt');
const { sequelize, User, Category, Warehouse, Supplier, Product, Inventory, Customer, PurchaseOrder, Order, Shipment } = require('./src/models');

const seed = async () => {
  try {
    // Force sync database to wipe and start fresh
    await sequelize.sync({ force: true });
    console.log('[1/4] Database synced (force: true) - wiped old data.');

    // 1. Create Shubham Admin User
    const hashedPassword = await bcrypt.hash('password', 10);
    const shubham = await User.create({
      name: 'Shubham',
      email: 'shubham@gmail.com',
      password: hashedPassword,
      role: 'Admin'
    });
    console.log(`[2/4] Created user: ${shubham.email} with role: ${shubham.role}`);

    // 2. Create foundational data (Categories, Warehouses, Suppliers, Customers)
    const catElectronics = await Category.create({ name: 'Electronics', description: 'Gadgets and devices' });
    const catApparel = await Category.create({ name: 'Apparel', description: 'Clothing and accessories' });

    const wh1 = await Warehouse.create({ name: 'Central Hub NYC', location: 'New York, USA', capacity: 50000 });
    const wh2 = await Warehouse.create({ name: 'West Coast Distribution', location: 'Los Angeles, USA', capacity: 35000 });

    const supTech = await Supplier.create({ name: 'TechGlobal Supply', contact_email: 'b2b@techglobal.com', phone: '1-800-555-0199', rating: 4.8 });
    const supTextile = await Supplier.create({ name: 'Prime Textiles', contact_email: 'orders@primetextiles.com', rating: 4.5 });

    const custAlpha = await Customer.create({ name: 'Alpha Retailers', email: 'procurement@alpharetail.com' });

    // 3. Create Products and Inventory
    const prodLaptop = await Product.create({ name: 'MacBook Pro M3', category_id: catElectronics.id, price: 1999.99 });
    const prodHeadphones = await Product.create({ name: 'Sony WH-1000XM5', category_id: catElectronics.id, price: 349.99 });
    const prodShirt = await Product.create({ name: 'Organic Cotton T-Shirt', category_id: catApparel.id, price: 29.99 });

    await Inventory.bulkCreate([
      { product_id: prodLaptop.id, warehouse_id: wh1.id, quantity: 450 },
      { product_id: prodHeadphones.id, warehouse_id: wh1.id, quantity: 1200 },
      { product_id: prodHeadphones.id, warehouse_id: wh2.id, quantity: 800 },
      { product_id: prodShirt.id, warehouse_id: wh2.id, quantity: 5000 },
      // low stock example
      { product_id: prodLaptop.id, warehouse_id: wh2.id, quantity: 15 }
    ]);

    // 4. Create dummy orders and POs
    await PurchaseOrder.create({
      supplier_id: supTech.id,
      status: 'Pending',
      total_amount: 50000.00,
      expected_delivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // +7 days
    });

    const order1 = await Order.create({
      customer_id: custAlpha.id,
      product_id: prodLaptop.id,
      quantity: 50,
      status: 'In Transit'
    });

    await Shipment.create({
      order_id: order1.id,
      status: 'In Transit',
      courier_details: 'FedEx Express',
      location_lat: 34.0522,
      location_lng: -118.2437,
      eta: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // +2 days
    });

    console.log('[3/4] Successfully injected dummy products, inventory, orders, and shipments.');
    
    console.log('\n=======================================');
    console.log('User Details:');
    console.log(`Email: ${shubham.email}`);
    console.log(`Password: password`);
    console.log(`Role: ${shubham.role}`);
    console.log('=======================================\n');
    console.log('[4/4] Seed complete!');
    process.exit(0);

  } catch (error) {
    console.error('Failed to seed DB:', error);
    process.exit(1);
  }
};

seed();
