
const axios = require('axios');

const addFund = require('./add-fund');
const getfunds = async () => {
   
        const options = {
            method: 'GET',
            url: `https://api.settrade.com/api/mutual-fund-compare/info/list?amcId=&fundType=&fundGroupCode=&taxAllowance=&dividendPolicy=`
        };

        const responsePolicy = await axios(options);

        const funds = responsePolicy.data.fundCompareInfos
        //console.log('reponse ',  funds)
       addFund(funds)
  
}

module.exports = getfunds;