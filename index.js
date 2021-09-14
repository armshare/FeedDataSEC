const express = require('express');
const request = require('request');
const sql = require('mssql');

const app = express();

const getOrder = require('./get-order');
const getFundRiskLevel = require('./get-fund-risk-level');

const config = {
  user: 'sa',
  password: 'Arm1234!',
  server: 'localhost',
  database: 'my_is',
  port: 1433,
  trustServerCertificate: true
};

//set header
var headers = {
  'Ocp-Apim-Subscription-Key': '35760a71a7a44f8694765d06425cac55',
  'Cache-Control': 'no-cache'
};

getOrder();


//addRisk();
async function addRisk(data){
    console.log('addRisk ',data)
    // try {
    //     let pool = await sql.connect(config);
    //     await pool.request().query(`INSERT INTO fund_risk_dim VALUES ('test', 'test' , 'RS1', 'เสี่ยงไม่มาก')`, (err,result)=>{
    //         console.log('result insert ', result)
    //     });
    //     // console.log('funds ', funds)
    // }
    // catch (error) {
    //     console.log(error);
    // }
}
