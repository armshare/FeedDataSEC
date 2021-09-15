const sql = require('mssql');
const dbConfig = require('./keys/db-config');

const addRisk = async (data) => {
 

  try {
    let pool = await sql.connect(dbConfig);
    await pool.request().query(`INSERT INTO fund_risk_dim VALUES ('${data.proj_id}', '${data.proj_abbr_name}' , '${data.type_risk}', '${data.risk_spectrum_desc}')`, (err, result)=>{
      console.log('result insert ', result)
    });
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = addRisk;
