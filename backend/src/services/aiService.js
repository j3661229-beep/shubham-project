const { GoogleGenerativeAI } = require('@google/generative-ai');

const predictDemandWithAI = async (historicalData) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Based on the following historical demand data (quantity over time), predict the required quantity for the next month. Return ONLY the predicted numerical quantity as an integer. Data: ${JSON.stringify(historicalData)}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    // Parse integer from response text
    const predictedValue = parseInt(responseText.replace(/\D/g, ''), 10);
    return isNaN(predictedValue) ? 0 : predictedValue;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('AI prediction failed');
  }
};

module.exports = { predictDemandWithAI };
