const axios = require('axios');
const sleep = require('./sleep');
const headers = require('./keys/api-key');
const addRisk = require('./add-risk')


const getFundRiskLevelAndAddToDatabase = async (funds) => {
  for (const fund of funds) {
    // Prepare options
    const options = {
      method: 'GET',
      headers,
      url: `https://api.sec.or.th/FundFactsheet/fund/${fund.proj_id}/suitability`,
    };
    
    // Call to SEC API
    const responseRisk = await axios(options);

    let result = {};
    // Prepare data
    let risk_spectrum_desc = new Buffer(responseRisk.data.risk_spectrum_desc, 'base64');
    result.risk_spectrum_desc = risk_spectrum_desc.toString();

    const risk_spectrum = responseRisk.data.risk_spectrum;
    result.proj_abbr_name = fund.proj_abbr_name;
    result.proj_id = fund.proj_id;

    if (risk_spectrum == "RS1") {
      result.type_risk = '1';
    } else if (risk_spectrum == "RS2") {
      result.type_risk = '2';
    } else if (risk_spectrum == "RS3") {
      result.type_risk = '3';
    } else if (risk_spectrum == "RS4") {
      result.type_risk = '4';
    } else if (risk_spectrum == "RS5") {
      result.type_risk = '5';
    } else if (risk_spectrum == "RS6") {
      result.type_risk = '6';
    } else if (risk_spectrum == "RS7") {
      result.type_risk = '7';
    } else if (risk_spectrum == "RS8") {
      result.type_risk = '8';
    } else {
      result.type_risk = '8+';
    }
    
    console.log('result: ', result);


    // TODO Add database
    await addRisk(result);
    // นอน
    await sleep(1000);
  }
}

module.exports = getFundRiskLevelAndAddToDatabase;
