require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');

// Import models to ensure associations are defined before sync
require('./models');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// Middleware to ensure DB connection (handles Neon cold starts)
let isConnected = false;
app.use(async (req, res, next) => {
  if (req.path === '/api/health') return next();
  
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }
    next();
  } catch (error) {
    console.error('CRITICAL DB ERROR:', error);
    res.status(500).json({ 
      error: 'Database connection failed', 
      message: error.message 
    });
  }
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/demand', require('./routes/demandRoutes'));
app.use('/api/shipments', require('./routes/shipmentRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/warehouses', require('./routes/warehouseRoutes'));
app.use('/api/suppliers', require('./routes/supplierRoutes'));
app.use('/api/purchase_orders', require('./routes/purchaseOrderRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));

const PORT = process.env.PORT || 5000;

// Conditionally start server for local development
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const startServer = async () => {
    await connectDB();
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('Database synced');
    }
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  };
  startServer();
}

module.exports = app;
