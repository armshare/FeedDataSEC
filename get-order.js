
const sql = require('mssql');
const moment = require('moment')
//const dbConfig = require('./keys/db-config');

const getOrders = async () => {
  try {
    let pool = await sql.connect(dbConfig);
     let funds = await pool.request().query(`SELECT * FROM  dim_funds_settrade order by symbol asc`);
 
    const fund = funds.recordset.map(i => ( i.symbol));
    return fund;
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = getOrders;
