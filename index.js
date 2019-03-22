const express = require('express');
const axios = require('axios');
const auth = require('./Auth');
const tokenAuth = auth.router;
const AUTH_TOKEN = auth.AUTH_TOKEN;
const constants = require('./constants');
const baseURI = constants.baseURI;
const client = constants.roleManagementID;
const request = require('request');
// axios.defaults.headers.common['Authorization'] =AUTH_TOKEN.AUTH_TOKEN;    

const app = express();
const port = 7000;

// app.use(cors);

//Check for the current users role for an authorizer or an inputter
//If currnet user is either one of them, then 


//token generation for client
app.use('*',tokenAuth);


app.get('/users',(req, res) => {
    
    axios.get('http://localhost:8080/auth/admin/realms/dev/users', {
        headers : {"Authorization" : `Bearer ${req.AUTH_TOKEN}`}
    })
                .then(response => {
                    console.log(response.data)
                    res.send(response.status)
                    
                }).catch(error => {
                    console.log(error)
                })
            });




//User creation process in the temporary database
app.post('/users', (req, res) => {

    // console.log(req.headers.session_id);
    //requesting the active sessions for the realm management client
    axios.get(baseURI + '/clients/' + client + '/user-sessions' ,{
        headers : {"Authorization" : `Bearer ${AUTH_TOKEN}`
        }
    })      
    .then(userSessionResponse => {
        for(let session of userSessionResponse){
            
            if(session.id == req.headers.session_id){
                
                axios.get(baseURI + '/users/' + session.userId + '/role-mappings',{
                    headers : {"Authorization" : `Bearer ${AUTH_TOKEN}`}
                } )
                .then(rolesResponse => {
                    //check the realm mappings and check whether user has an inputter
                    //role mapping.If there enter the req body data in to the database
                    for(let role of rolesResponse){
                        if(role.name == "inputter"){
                            //db query
                            res.status(201).send('created')
                            break;
                        }
                    }
                    res.send("User doesnt have the proper role to create user");
                })

            }
        }
        res.send("session not found")


    })
    // axios.post('http://localhost:8080/auth/admin/realms/master/users',{
    //     headers : {"Authorization" : `Bearer ${AUTH_TOKEN.AUTH_TOKEN}`}
    // })
    res.status(200).send("success");
})

app.listen(port, () => {
    console.log('IDP Service up at port ' + port)
})


