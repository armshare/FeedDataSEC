const sql = require('mssql');
const moment = require('moment');
const dbConfig = require('./keys/db-config');

const getDate = async () => {

    try {
        let pool = await sql.connect(dbConfig);
        let lastMonthDate = await pool.request().query(`
        exec sp_last3days 
        `);
      //  console.log('lastMonthDate ', lastMonthDate)
         const date = lastMonthDate.recordset.map(i => (
             moment(i.DataDate).format('YYYY-MM-DD')
        ));
        return date;
    } catch (err) {
        console.log(`error : `, err)
    }
}

module.exports = getDate;