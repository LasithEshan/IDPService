const express = require("express");
const axios = require("axios");
const auth = require("./Auth");
const constants = require("./constants");
const request = require("request");
const jwt = require("jsonwebtoken");
const body_parser = require("body-parser");
const db = require("oracledb");
const queries = require("./db");
const pino = require("pino");
const logger = pino({
  prettyPrint: {
    colorize: true
  }
});

const tokenAuth = auth.router;
const AUTH_TOKEN = auth.AUTH_TOKEN;
const baseURI = constants.baseURI;
const client = constants.roleManagementID;
let resultSet = queries.resultSet;

db.autoCommit = true;
db.outFormat = db.OBJECT;

const app = express();
const port = 7000;

//TODO
//Endpoint for extracting user info from the user id
//

// app.use(cors);

//Check for the current users role for an authorizer or an inputter
//If currnet user is either one of them, then

//token generation for client
app.use(express.json());
app.use("*", tokenAuth);

app.get("/users", (req, res) => {
  //TODO find a way to get the set of results of the function to here
  let result = queries.getAllUsers().then(result => {
    res.status(200).send(result.rows);
  });
});



app.get("/auth", (req, res) => {
  console.log(req);
});

//User creation process in the temporary database
app.post("/users", (req, res) => {
  let decoded = jwt.decode(req.headers.token);
  let roles = decoded.realm_access.roles;

  if (roles.includes(constants.ROLE_INPUTTER)) {
    //input the user to the database
    // logger.info(decoded);
    // logger.info(req.body)
    queries
      .insertUser(
        req.body.username,
        req.body.email,
        decoded.preferred_username,
        0,
        req.body.name,
        req.body.epf_number,
        req.body.branch,
        req.body.department,
        req.body.mobile_number,
        req.body.start_date,
        req.body.end_date,
        req.body.userStatus,
        req.body.password,
        req.body.userRole,
        constants.CREATE_USER,
        constants.NOT_AUTHORIZED

      ).catch(err => {
        logger.error(err);
      })
      .then(result => {
        res.status(201).send(req.body);
        logger.info(result);
        logger.info("User created temporaly");
      });
  } else {
    res.sendStatus(401);
  }
});


app.post("/users/edit", (req, res) => {
  let decoded = jwt.decode(req.headers.token);
  let roles = decoded.realm_access.roles;
  
  if(roles.includes(constants.ROLE_EDITOR)){
    queries.insertUser(
      req.body.username,
        req.body.email,
        decoded.preferred_username,
        0,
        req.body.name,
        req.body.epf_number,
        req.body.branch,
        req.body.department,
        req.body.mobile_number,
        req.body.start_date,
        req.body.end_date,
        req.body.userStatus,
        req.body.password,
        req.body.userRole,
        constants.EDIT_USER,
        constants.NOT_AUTHORIZED

    ).catch(err => {
      logger.error(err)
    }).then(result =>{
      res.status(200).send(req.body);
      logger.info(result);
      logger.info("User edit request recorded")
    })
  }else{
    res.sendStatus(401);
  }

  


  
})



app.post("/users/auth", (req, res) => {
  //TODO- have to send a OTP to the user after creating the user in keycloak
  let decoded = jwt.decode(req.headers.token);
  let roles = decoded.realm_access.roles;
  let tokenUsername = new String(decoded.preferred_username).trim();
  let creator = new String(req.body.creator).trim();
  let auth_type = req.body.auth_type;
  
  //retrieve the user from db with id
  //check for the role and check for the creator of the user in the database.If matched unauthorize

  if(auth_type === constants.CREATE_USER){

    if (roles.includes(constants.ROLE_AUTHORIZER) && tokenUsername !== creator) {
      axios
        .post(
          `${baseURI}/users`,
          {
            username: req.body.username,
            email: req.body.email,
            enabled: true,
            attributes:{
              'epf_number': req.body.epf_number,
              'branch' : req.body.branch,
              'department' :req.body.department,
              'mobile_number' : req.body.mobile_number,
              'start_date' : req.body.start_date,
              'end_date' : req.body.end_date
            },
            credentials : [{
              type: 'password',
              value :req.body.password,
              temporary :true

            }],
            firstName : req.body.name,
            realmRoles: req.body.userRole

          },
          {
            headers: {
              Authorization: "Bearer " + req.AUTH_TOKEN
            }
          }
        )
        .catch(err => {
          logger.error(err);
          res.status(err.response.status).send(err.response.data);
        })
        .then(result => {
          logger.info(result);
          queries.deleteUser(req.body.id);
          axios
            .get(`${baseURI}/users?username=${req.body.username}`, {
              headers: {
                Authorization: "Bearer " + req.AUTH_TOKEN
              }
            })
            .catch(err => {
              logger.info(err);
            })
            .then(result => {
              logger.info(result);
            });
          res.sendStatus(201);
        });
    } else {
      res.sendStatus(401);
    }

  }else if(auth_type === constants.EDIT_USER){

  }

 
});



app.listen(port, () => {
  console.log("IDP Service up at port " + port);
});
