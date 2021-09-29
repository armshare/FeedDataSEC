const sleep = require('./sleep')
const headers = require('./keys/api-key');
const axios = require('axios');
const updatePolicy = require('./update-policy')
const getPolicy = async (funds) => {
    for (const fund of funds) {

        const options = {
            method: 'GET',
            headers,
            url: `https://api.sec.or.th/FundFactsheet/fund/${fund.proj_id}/policy`
        };

        const responsePolicy = await axios(options);

        console.log('reponse ', fund.proj_id, responsePolicy.status)
        if(responsePolicy.status == 200){

            console.log('result ' , responsePolicy.data.policy_desc)
            const {policy_desc} = responsePolicy.data;
            const result = {}
            result['proj_id'] = fund.proj_id
            result['policy'] = policy_desc
            console.log('result ' , result)
            updatePolicy(result)
        }
        await sleep(500)
    }
}

module.exports = getPolicy;