const moment = require('moment')
const axios = require('axios');
const sleep = require('./sleep');
//const headers = require('./keys/api-key');
//const addNAV = require('./add-nav')


const getFundsNAVsettrade = async (funds) => {


    for (const fund of funds) {
        const options = {
            method: 'GET',
            url: `https://api.settrade.com/api/fund-nav/${fund}?fromDate=01/01/2017&toDate=29/09/2021`,
        };

        const responseNAV = await axios(options);
        console.log('res status', responseNAV.status);
        console.log('res ', responseNAV.data.fundNavs);
        if (responseNAV.data.fundNavs.lenght != 0) {
          
           // await addNAV(result)
        }
        await sleep(10000);
    }


}

module.exports = getFundsNAVsettrade;