const sql = require('mssql');
const dbConfig = require('./keys/db-config');

const sleep = require('./sleep');


const updateInceptionDate = async (funds) => {
  for (const fund of funds) {
    try {
      let pool = await sql.connect(dbConfig);
      await pool.request().query(`
            update fund_dim set regis_date = '${fund.inception_date}' where proj_id = '${fund.proj_id}'`, (err, result) => {
        console.log('result update ', result)
      });
      console.log('updated ', fund);
      // นอน
      await sleep(500);
    }
    catch (error) {
      console.log(error);
    }
  }

}

module.exports = updateInceptionDate;
