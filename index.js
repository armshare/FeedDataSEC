const express = require('express')
const request = require('request')
const app = express()


const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'Arm1234!',
    server: 'localhost',
    database: 'my_is',
    port: 1433,
    trustServerCertificate: true
};

getOrders()

async function getOrders() {
    try {
        let pool = await sql.connect(config);
        let funds = await pool.request().query(`SELECT * FROM  fund_dim WHERE fund_status = 'RG'`);
        // console.log('funds ', funds)
        const fund = funds.recordset.map(i => ({ "proj_abbr_name": i.proj_abbr_name, "proj_id": i.proj_id }));
Hey
        getFundRiskLevel(fund)
    }
    catch (error) {
        console.log(error);
    }
}

//set header
var headers = {
    'Ocp-Apim-Subscription-Key': '35760a71a7a44f8694765d06425cac55',
    'Cache-Control': 'no-cache'
};
 async function getFundRiskLevel(fund) {
    
     fund.forEach((fund, i) => {
        setTimeout( () => {
            request.get(
                {
                    url: `https://api.sec.or.th/FundFactsheet/fund/${fund.proj_id}/suitability`,
                    headers: {
                        'Ocp-Apim-Subscription-Key': '35760a71a7a44f8694765d06425cac55',
                        'Cache-Control': 'no-cache'
                    }
                }, 
                (err, res, body) => {
                    console.log('res ', res )
                    if (err) { return console.log(err); }
                    const { risk_spectrum } = JSON.parse(body);
                    const result = { risk_spectrum };
                    if (result.risk_spectrum == "RS1") {
                        result['typeRisk'] = 'ความเสี่ยงระดับ 1';
                    } else if (result.risk_spectrum == "RS2") {
                        result['typeRisk'] = 'ความเสี่ยงระดับ 2';
                    } else if (result.risk_spectrum == "RS3") {
                        result['typeRisk'] = 'ความเสี่ยงระดับ 3';
                    } else if (result.risk_spectrum == "RS4") {
                        result['typeRisk'] = 'ความเสี่ยงระดับ 4';
                    } else if (result.risk_spectrum == "RS5") {
                        result['typeRisk'] = 'ความเสี่ยงระดับ 5';
                    } else if (result.risk_spectrum == "RS6") {
                        result['typeRisk'] = 'ความเสี่ยงระดับ 6';
                    } else if (result.risk_spectrum == "RS7") {
                        result['typeRisk'] = 'ความเสี่ยงระดับ 7';
                    } else if (result.risk_spectrum == "RS8") {
                        result['typeRisk'] = 'ความเสี่ยงระดับ 8';
                    } else {
                        result['typeRisk'] = 'ความเสี่ยงระดับ 8+';
                    }
        
                    result['proj_abbr_name'] = fund.proj_abbr_name;
                    result['proj_id'] = fund.proj_id;
                    console.log('result api ', result);
                    addRisk(result)
                });
            console.log('fundRisk ', i , ' = ')
          }, i * 1000, fund);
   });
   
}

 function displayRisk(fund){
    console.log('fund in display', fund)
    try{
     request.get(
        {
            url: `https://api.sec.or.th/FundFactsheet/fund/${fund.proj_id}/suitability`,
            headers: {
                'Ocp-Apim-Subscription-Key': '35760a71a7a44f8694765d06425cac55',
                'Cache-Control': 'no-cache'
            }
        }, 
        (err, res, body) => {
            console.log('res ', res )
            if (err) { return console.log(err); }
            const { risk_spectrum } = JSON.parse(body);
            const result = { risk_spectrum };
            if (result.risk_spectrum == "RS1") {
                result['typeRisk'] = 'ความเสี่ยงระดับ 1';
            } else if (result.risk_spectrum == "RS2") {
                result['typeRisk'] = 'ความเสี่ยงระดับ 2';
            } else if (result.risk_spectrum == "RS3") {
                result['typeRisk'] = 'ความเสี่ยงระดับ 3';
            } else if (result.risk_spectrum == "RS4") {
                result['typeRisk'] = 'ความเสี่ยงระดับ 4';
            } else if (result.risk_spectrum == "RS5") {
                result['typeRisk'] = 'ความเสี่ยงระดับ 5';
            } else if (result.risk_spectrum == "RS6") {
                result['typeRisk'] = 'ความเสี่ยงระดับ 6';
            } else if (result.risk_spectrum == "RS7") {
                result['typeRisk'] = 'ความเสี่ยงระดับ 7';
            } else if (result.risk_spectrum == "RS8") {
                result['typeRisk'] = 'ความเสี่ยงระดับ 8';
            } else {
                result['typeRisk'] = 'ความเสี่ยงระดับ 8+';
            }

            result['proj_abbr_name'] = fund.proj_abbr_name;
            result['proj_id'] = fund.proj_id;
            console.log('result api ', result);
        });
    }catch(e){
        console.log(error);
    }
}



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


