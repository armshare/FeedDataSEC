
const sql = require('mssql');
const dbConfig = require('./keys/db-config');

const getOrders = async () => {
  try {
    let pool = await sql.connect(dbConfig);
    let funds = await pool.request().query(`SELECT * FROM  fund_dim WHERE fund_status = 'RG'`);
    // console.log('funds ', funds)
    const fund = funds.recordset.map(i => ({ "proj_abbr_name": i.proj_abbr_name, "proj_id": i.proj_id }));
    return fund;
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = getOrders;
