const sql = require('mssql');
const dbConfig = require('./keys/db-config');



const addBenchmark = async (result) => {
    console.log(result)
   const { proj_abbr_name, data } = result;
    for (bm of data) {
        
        try {
            let pool = await sql.connect(dbConfig);
            console.log(`name = ${proj_abbr_name} , proj_id = ${bm.proj_id} , group_seq = ${bm.group_seq}, benchmark = ${bm.benchmark}`)
            await pool.request().query(`INSERT INTO fund_benchmark_dim VALUES ('${bm.proj_id}', '${proj_abbr_name}' , '${bm.group_seq}', '${bm.benchmark}')`, (err, result) => {
                console.log('result insert ', result)
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = addBenchmark;