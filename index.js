const express = require('express');
const axios = require('axios');
const auth = require('./Auth');
const tokenAuth = auth.router;
const AUTH_TOKEN = auth.AUTH_TOKEN;
const baseURI = require('./constants');
// axios.defaults.headers.common['Authorization'] =AUTH_TOKEN.AUTH_TOKEN;    

const app = express();
const port = 7000;

// app.use(cors);

//Check for the current users role for an authorizer or an inputter
//If currnet user is either one of them, then 

app.use(tokenAuth);

app.get('/users',(req, res) => {

    
    axios.get(baseURI + '/users', {
        headers : {"Authorization" : `Bearer ${AUTH_TOKEN}`}
    })
                .then(response => {
                    console.log(response.data)
                    res.send(response.data)
                    
                }).catch(error => {
                    console.log("")
                })
            });


app.post('/users', (req, res) => {
    axios.post('http://localhost:8080/auth/admin/realms/master/users',{
        headers : {"Authorization" : `Bearer ${AUTH_TOKEN.AUTH_TOKEN}`}
    })
})

app.listen(port, () => {
    console.log('IDP Service up at port ' + port)
})





























