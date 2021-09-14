// const express = require('express');
// const app = express();
const getOrder = require('./get-order-from-json');
const getFundRiskLevelAndAddToDatabase = require('./get-fund-risk-level');

const handleRisk = async () => {
  const funds = await getOrder();
  await getFundRiskLevelAndAddToDatabase(funds);
}

handleRisk();