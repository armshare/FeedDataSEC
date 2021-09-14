const sql = require('mssql');
const dbConfig = require('./keys/db-config');

const addRisk = async (data) => {
  console.log('addRisk ', data);

  try {
    let pool = await sql.connect(dbConfig);
    await pool.request().query(`INSERT INTO fund_risk_dim VALUES ('test', 'test' , 'RS1', 'เสี่ยงไม่มาก')`, (err, result)=>{
      console.log('result insert ', result)
    });
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = addRisk;
