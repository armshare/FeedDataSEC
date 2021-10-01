const sql = require('mssql');
const dbConfig = require('./keys/db-config');
const sleep = require('./sleep');

const addFund = async (data) => {

    for (const fund of data) {
        //console.log(fund)
        try {
            let pool = await sql.connect(dbConfig);
            await pool.request().query(`INSERT INTO dim_funds_settrade VALUES ('${fund.symbol}', '${fund.nameTh}' 
            , '${fund.nameEn}', '${fund.aimcType}'
            , '${fund.amcId}', '${fund.managementStyle}'
            , '${fund.dividendPolicy}', '${fund.riskLevel}'
            , '${fund.taxAllowance}')`, (err, result) => {
                console.log('result insert ', result)
            });
        }
        catch (error) {
            console.log(error);
        }

        await sleep(100)
    }
}

module.exports = addFund;
