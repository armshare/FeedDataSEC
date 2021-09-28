// const express = require('express');
// const app = express();
const getOrder = require('./get-order');
const getDate = require('./get-date');
const getFundRiskLevelAndAddToDatabase = require('./get-fund-risk-level');
const updateInceptionDate = require('./update-InceptionDate')
const getFundRBenchmarkAndAddToDatabase = require('./get-fund-benchmark')
const getFundsNAV = require('./get-fund-nav')
const handleRisk = async () => {
   const funds = await getOrder();
 // const date = await getDate();
  
  await getFundRiskLevelAndAddToDatabase(funds);
  //await getFundRBenchmarkAndAddToDatabase(funds);
  // await getFundsNAV(funds, date)
}

handleRisk();