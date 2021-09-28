const sql = require('mssql');
const dbConfig = require('./keys/db-config');

const addNAV = async (data) => {


    try {
        let pool = await sql.connect(dbConfig);
        await pool.request().query(`INSERT INTO fund_NAV_fact VALUES (
            '${data.proj_id}', 
        '${data.proj_abbr_name}' , 
        '${data.amc_info}', 
        '${data.NAV_date}', 
        '${data.NetAsset}', 
        '${data.UnitBalance}', 
        '${data.NAV_price}'
        )`
            , (err, result) => {
                console.log('result insert ', result)
            });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = addNAV;
