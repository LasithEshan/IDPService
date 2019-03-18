const express = require('express');
const axios = require('axios');
const AUTH_TOKEN = require('./Auth');
const cors = require('cors');
// axios.defaults.headers.common['Authorization'] =AUTH_TOKEN.AUTH_TOKEN;    

const app = express();
const port = 7000;

// app.use(cors);

//Check for the current users role for an authorizer or an inputter
//If currnet user is either one of them, then 

app.get('/users',(req, res) => {

    
    axios.get('http://localhost:8080/auth/admin/realms/master/users', {
        headers : {"Authorization" : `Bearer ${AUTH_TOKEN.AUTH_TOKEN}`}
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
