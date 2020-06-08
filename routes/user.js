const express = require("express");
const router = express.Router();
const { poolPromise } = require("../database/db");
var axios = require("axios");
const Joi = require("joi");
var http = require("https");
var qs = require("querystring");
const {appConfig} = require("../database/appConfig");
let jwt = require('jsonwebtoken');
let config = require('../config/config');
let middleware = require('../middleware/auth');


router.post("/login", async (request, response) => {
    let { Email, Password } = request.body;
    var data;
    var options = {
        "method": "POST",
        "hostname": `${appConfig.azureUrl}`,
        "port": null,
        "path": "/Customer/Home/Login",
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
          "cache-control": "no-cache",
          "postman-token": "42021288-e54a-9587-3076-c7709d3980fa",
          "accept": "application/json, text/plain, */*"
        }
      };
      var req = http.request(options, function (res) {
        var chunks = [];
       
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          
          data = Buffer.concat(chunks);
         
          if(data.length > 80){
            let token = jwt.sign({username: Email},
              config.secret,
              { expiresIn: '24h' // expires in 24 hours
              }
            );
            response.status(201).send({"data" : [JSON.parse(data)], "token": token});
          }
          else{
            response.status(201).send({"data" : [], "token": 'inValid'});
          }
         
        });
      });
      
      req.write(qs.stringify({ Email: Email , Password : Password }));
      req.end();
  });

  router.post("/register", async (request, response) => {
      let {Name,  Email, PhoneNumber, StreetAddress, State,  PostalCode, Password, City} = request.body;
      var data;
      var options = {
        "method": "POST",
        "hostname": `${appConfig.azureUrl}`,
        "port": null,
        "path": "/Customer/Home/Register",
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
          "cache-control": "no-cache",
          "postman-token": "d292b3dc-e74b-dce3-8dbd-d15b0e21067c"
        }
      };
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          data = Buffer.concat(chunks);
          response.status(201).send(JSON.parse(data));
        });
      });
      
      req.write(qs.stringify({ 
        Name: Name,
        Email: Email,
        PhoneNumber: PhoneNumber,
        StreetAddress: StreetAddress,
        State: State,
        PostalCode: PostalCode,
        Password: Password,
        City: City }));
        req.end();

  })

module.exports = router;
