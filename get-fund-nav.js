const moment = require('moment')
const axios = require('axios');
const sleep = require('./sleep');
const headers = require('./keys/api-key');
const addNAV = require('./add-nav')


const getFundsNAV = async (funds, date) => {
    // console.log('funds list ', funds)
    // console.log('date list ', date)
    const filterFunds = funds.filter((v, k) => k > 751)
 //   console.log('filterfunds ', filterFunds);
  //   filterFunds;
    for (const fund of filterFunds) {

        filterFundDate = date.filter(i => moment(i) >= moment(fund.inception_date) && moment(i) <= moment());
        fund['navDate'] = filterFundDate;
    }
   
    for (const fund of filterFunds) {
        for (const navDate of fund.navDate) {
            const options = {
                method: 'GET',
                headers,
                url: `https://api.sec.or.th/FundDailyInfo/${fund.proj_id}/dailynav/${navDate}`,
            };

            const responseNAV = await axios(options);
            console.log('res ', fund.proj_abbr_name, ' , ', navDate, ' is a ', moment(navDate).format('ddd'))
            if (responseNAV.data != '') {
                const { nav_date, net_asset, last_val, amc_info } = responseNAV.data;
                const result = {};
                result['NAV_date'] = nav_date;
                result['NetAsset'] = net_asset;
                result['UnitBalance'] = net_asset / last_val;
                result['NAV_price'] = last_val;
                result['proj_id'] = fund.proj_id;
                result['proj_abbr_name'] = fund.proj_abbr_name;
                result['amc_info'] = amc_info[0].unique_id;

                console.log('res NAV', result);
                await addNAV(result)
            }
        }
        await sleep(1500);
    }


}

module.exports = getFundsNAV;