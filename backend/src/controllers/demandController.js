const { DemandData, Prediction } = require('../models');
const { predictDemandWithAI } = require('../services/aiService');

const getDemandHistory = async (req, res) => {
  try {
    const demand = await DemandData.findAll({ order: [['timestamp', 'DESC']] });
    res.json(demand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const predictDemand = async (req, res) => {
  try {
    const { product_id } = req.body;
    
    // Fetch historical demand
    const historicalData = await DemandData.findAll({
      where: { product_id },
      attributes: ['quantity', 'timestamp'],
      order: [['timestamp', 'ASC']],
    });

    if (historicalData.length === 0) {
      return res.status(400).json({ message: 'No historical data available for this product' });
    }

    // Call AI Service
    const predicted_value = await predictDemandWithAI(historicalData);

    // Save Prediction
    const predictionDate = new Date();
    predictionDate.setMonth(predictionDate.getMonth() + 1); // predict for next month

    const prediction = await Prediction.create({
      product_id,
      predicted_value,
      date: predictionDate
    });

    res.json(prediction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDemandHistory, predictDemand };
