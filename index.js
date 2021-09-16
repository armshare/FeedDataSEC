// const express = require('express');
// const app = express();
const getOrder = require('./get-order');
const getFundRiskLevelAndAddToDatabase = require('./get-fund-risk-level');
const updateInceptionDate = require('./update-InceptionDate')
const handleRisk = async () => {
  const funds = await getOrder();
  //console.log('funds', funds)
  //await getFundRiskLevelAndAddToDatabase(funds);
  await updateInceptionDate(funds);
}

handleRisk();