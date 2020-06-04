const express = require('express');
const cors = require('cors');
const restaurant = require('../routes/restaurant');
const user = require('../routes/user')
var fs = require('fs');
var path = require("path");
var public = path.join(__dirname, "../public");

module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    app.get('/',function (req, res) { 
     res.sendFile(path.join(public, "index.html"));
    });
    app.use("/", express.static(public));
    app.use('/api/restaurant', restaurant);  
    app.use('/api/user', user);   
    
}
