const express = require('express');
const axios = require('axios');
const router = express.Router();
const cors = require('cors');
const constants = require('./constants');
const baseURI = constants.baseURI;
let AUTH_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkSlhNNkdhamt6aU50dWo1NVM0cUZEYkl1TFpOMkhpM1ZBbWlyTzZWR19jIn0.eyJqdGkiOiI2YTlmOTIwYy05MDhiLTRiN2YtYjJkYy05NzdkZTdlZWIxZjIiLCJleHAiOjE1NTMxOTcyMTgsIm5iZiI6MCwiaWF0IjoxNTUzMTYxMjE4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvZGV2IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImQ4MWFiZjU2LWE1NDktNGM5Ni05OGRjLTRlNmI0ZTFmMjM5NSIsInR5cCI6IkJlYXJlciIsImF6cCI6InJlYWxtLW1hbmFnZW1lbnQiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiI4NmJjN2EwOS0xNTQ1LTQ4MWEtODg4OC1hYzZjZmUxMDYyZjUiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiYWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJ1bWFfcHJvdGVjdGlvbiIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTI3LjAuMC4xIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRJZCI6InJlYWxtLW1hbmFnZW1lbnQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtcmVhbG0tbWFuYWdlbWVudCIsImNsaWVudEFkZHJlc3MiOiIxMjcuMC4wLjEiLCJlbWFpbCI6InNlcnZpY2UtYWNjb3VudC1yZWFsbS1tYW5hZ2VtZW50QHBsYWNlaG9sZGVyLm9yZyJ9.PLEa6iuw_crKJHqvU3uzE6biTW0Rl9nvzXjbK7Lb8HhbfDHzliQFatcr1A-KkHtrG25aK6xlgXjsS72hX5bZ6ahq-USB2a5Esnvph8bR2D_v0T8iUOWj9aIG22c3wPWNe19y9C_RkH8I9B7yL5fLXYjiI9KwWRB6gMU5RMwvfWSr2uXygJYYcM-J3dFQCMD6rwHdu_YkcWfEMAut9hYyRba9qMWNdeI0IGMHmz6SE7sudTbg0ruWXSUDx6hEZcOqXKE-X3ZqIIUFHkjKemWIrki2wPd4-L9SaW58ns4tzMG_e8Arp4RFgVI4mQggPekHspic-gwCDydUHHAnB3sRDg';
const client = 'realm-management';
const client_pass = 'a4fa3431-7308-4f45-9bb8-fecf85749670'
const client_credentials = client + ':' + client_pass
const token = Buffer.from(client_credentials).toString('base64');
const queryString = require('querystring');
const request = require('request');

// router.use(cors({${baseURI}/protocol/openid-connect/token
//     credentials: true,
//     exposedHeaders:['Authorization']
// }));

router.use('*', (req, res, next) => {

    let data = queryString.stringify({
        grant_type: 'client_credentials'
    });

    console.log(token);


var options = { method: 'POST',
  url: 'http://localhost:8080/auth/realms/dev/protocol/openid-connect/token',
  headers: 
   {

     'cache-control': 'no-cache',
     Authorization: 'Basic cmVhbG0tbWFuYWdlbWVudDphNGZhMzQzMS03MzA4LTRmNDUtOWJiOC1mZWNmODU3NDk2NzA=',
     'Content-Type': 'application/x-www-form-urlencoded' }
     ,
  form: { grant_type: 'client_credentials', undefined: undefined } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

//   AUTH_TOKEN = body.
    // res.status(response.statusCode).send(response.statusMessage);
    const parsedBody = JSON.parse(body);
    // console.log(body);
    // console.log(parsedBody.access_token);
    req.AUTH_TOKEN = parsedBody.access_token;
    return next('router');
    

});

})

// module.exports = Object.freeze({
//     AUTH_TOKEN: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0ZUpqX1JsMHVCNlBSSHUwWHhJc21sQ3BWZTc1Rk5HVmZiZHhHX1BlRTV3In0.eyJqdGkiOiI2NWYwNGVkMi1iMjZhLTRkYTAtYTc5ZS01MjU2NmU4MGUwNjQiLCJleHAiOjE1NTI5NDA2MzIsIm5iZiI6MCwiaWF0IjoxNTUyOTA0NjMzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvbWFzdGVyIiwic3ViIjoiZTUzYTIwMmYtODhjMS00ZDI3LTg3ZGItYjM5Mzk3NDdkM2UwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwiYXV0aF90aW1lIjoxNTUyOTA0NjMyLCJzZXNzaW9uX3N0YXRlIjoiNWI0M2VkNTAtODhhZS00ZmQxLTk2YzctMjA3MDIxNmMyOGE4IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyJdfSwic2NvcGUiOiJvcGVuaWQgZW1haWwgb2ZmbGluZV9hY2Nlc3MgYWRkcmVzcyBwaG9uZSBwcm9maWxlIiwiYWRkcmVzcyI6e30sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW5uZXcifQ.VrFPVKrUD_5MJQrQ8c8YDUBGTZgsI69Q2yvdcSlkShikvCUPyaFQXCfh7AZDM1FT4vgGuzd-Qa-6Jv2BlImWaGliymAYcm-Sj1b_BrYyRd1H279k8H6wkvmVE4Q3aNbH6wlA8SPuk_gHKphYiKoAI7NDTuxe46vgn2Sq-pT-aIlcyKx8RGRSflGIv0Dfdddy5FVBkHarpI-3j6TEhcwTKEKJnZ_RXJwMh7b2tUi0dmhPElOhGxjUpsAVwTqNrVMLSk5kCOXR2ifuCEk7qBbtj08xkjkRcslGWIrOokVc6KgvWjU_f8ElCUAufjuDzl1hPjAYNZebdS3plsKOntxU_Q',
//     router
// })
module.exports = {
    router,
    AUTH_TOKEN

}