const axios = require('axios');
const sleep = require('./sleep');
const headers = require('./keys/api-key');
const addBenchmark = require('./add-benchmark');

const getFundRBenchmarkAndAddToDatabase = async (funds) => {
    for (const fund of funds) {
        // Prepare options
        const options = {
            method: 'GET',
            headers,
            url: `https://api.sec.or.th/FundFactsheet/fund/${fund.proj_id}/benchmark`,
        };
        console.log(fund.proj_abbr_name)
        // Call to SEC API
        const { data } = await axios(options);



        if (data.length > 0) {
            // console.log('----')
           
            let result = {};
            // // Prepare data
            // // let risk_spectrum_desc = new Buffer(responseBenchmark.data.risk_spectrum_desc, 'base64');
            // // result.risk_spectrum_desc = risk_spectrum_desc.toString();

            // // const risk_spectrum = responseBenchmark.data.risk_spectrum;
            result.proj_abbr_name = fund.proj_abbr_name;
            result.data = data            // // result.proj_id = fund.proj_id;

            // console.log('result: ', result);


            // TODO Add database
            await addBenchmark(result);
        }
        // นอน
        await sleep(1400);
    }
}

module.exports = getFundRBenchmarkAndAddToDatabase;
