// const express = require('express');
// const app = express();
const getOrder = require('./get-order');
const getDate = require('./get-date');
const getPolicy = require('./get-policy')
const getFundRiskLevelAndAddToDatabase = require('./get-fund-risk-level');
const updateInceptionDate = require('./update-InceptionDate')
const getFundRBenchmarkAndAddToDatabase = require('./get-fund-benchmark')
const getFundsNAV = require('./get-fund-nav')
const handleRisk = async () => {
   const funds = await getOrder();
 // const date = await getDate();
 getPolicy(funds)
  //await getFundRiskLevelAndAddToDatabase(funds);
  //await getFundRBenchmarkAndAddToDatabase(funds);
  // await getFundsNAV(funds, date)
}

handleRisk();