
const sql = require('mssql');
const moment = require('moment')
const dbConfig = require('./keys/db-config');

const getOrders = async () => {
  try {
    let pool = await sql.connect(dbConfig);
     let funds = await pool.request().query(`SELECT * FROM  fund_dim WHERE fund_status = 'RG' order by proj_id asc`);
   // let funds = await pool.request().query(`select * from risk_null_temp`);
    
    // console.log('funds ', funds)
    const fund = funds.recordset.map(i => ({
      "proj_abbr_name": i.proj_abbr_name,
      "proj_id": i.proj_id //,
    //  "inception_date":  moment(i.regis_date.split(' ')[0].split("/").reverse().join("-")).format("YYYY-MM-DD") 
    }));
    return fund;
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = getOrders;
