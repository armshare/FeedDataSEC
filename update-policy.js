const sql = require('mssql');
const dbConfig = require('./keys/db-config');
const sleep = require('./sleep');


const updatePolicy = async (fund) => {
  
    try {
      let pool = await sql.connect(dbConfig);
      await pool.request().query(`
            update dim_fund set policy = '${fund.policy}' where proj_id = '${fund.proj_id}'`, (err, result) => {
             console.log('result update ', result)
      });
    }
    catch (error) {
      console.log(error);
    }
  

}

module.exports = updatePolicy;
