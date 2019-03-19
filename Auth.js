const express = require('express');
const axios = require('axios');
const router = express.Router();
const baseURI = require('./constants');
const AUTH_TOKEN = null;
const client = 'realm-management';
const client_pass = 'a4fa3431-7308-4f45-9bb8-fecf85749670'
const client_credentials = client + ':' + client_pass
const token = Buffer.from(client_credentials).toString('base64');
router.all('*', (req, res) => {

    let data = JSON.stringify({
        grant_type: 'client_credentials'
    });

    console.log(token);
    axios.post(`${baseURI}/protocol/openid-connect/token`,data, {
        headers : {
            "Authorization" : "Basic " + token,
            "Content-Type" : "application/x-www-form-urlencoded",

        },
        withCredentials: true,
        auth:{
            username:client,
            password:client_pass
        }
    }
        ).then(response => {
            AUTH_TOKEN = response.data.access_token;
            console.log(response.data);
}).catch(error => {
    console.log(error.response);
})
})

// module.exports = Object.freeze({
//     AUTH_TOKEN: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0ZUpqX1JsMHVCNlBSSHUwWHhJc21sQ3BWZTc1Rk5HVmZiZHhHX1BlRTV3In0.eyJqdGkiOiI2NWYwNGVkMi1iMjZhLTRkYTAtYTc5ZS01MjU2NmU4MGUwNjQiLCJleHAiOjE1NTI5NDA2MzIsIm5iZiI6MCwiaWF0IjoxNTUyOTA0NjMzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvbWFzdGVyIiwic3ViIjoiZTUzYTIwMmYtODhjMS00ZDI3LTg3ZGItYjM5Mzk3NDdkM2UwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwiYXV0aF90aW1lIjoxNTUyOTA0NjMyLCJzZXNzaW9uX3N0YXRlIjoiNWI0M2VkNTAtODhhZS00ZmQxLTk2YzctMjA3MDIxNmMyOGE4IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyJdfSwic2NvcGUiOiJvcGVuaWQgZW1haWwgb2ZmbGluZV9hY2Nlc3MgYWRkcmVzcyBwaG9uZSBwcm9maWxlIiwiYWRkcmVzcyI6e30sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW5uZXcifQ.VrFPVKrUD_5MJQrQ8c8YDUBGTZgsI69Q2yvdcSlkShikvCUPyaFQXCfh7AZDM1FT4vgGuzd-Qa-6Jv2BlImWaGliymAYcm-Sj1b_BrYyRd1H279k8H6wkvmVE4Q3aNbH6wlA8SPuk_gHKphYiKoAI7NDTuxe46vgn2Sq-pT-aIlcyKx8RGRSflGIv0Dfdddy5FVBkHarpI-3j6TEhcwTKEKJnZ_RXJwMh7b2tUi0dmhPElOhGxjUpsAVwTqNrVMLSk5kCOXR2ifuCEk7qBbtj08xkjkRcslGWIrOokVc6KgvWjU_f8ElCUAufjuDzl1hPjAYNZebdS3plsKOntxU_Q',
//     router
// })
module.exports = {
    router,
    AUTH_TOKEN

}