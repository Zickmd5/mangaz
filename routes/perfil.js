var express = require('express');
var app = express();
var session = require('express-session')

app.use(session({secret:"123456789",resave: true,saveUninitialized: true,cookie: {maxAge: 1000000000000}}));

app.get('/',function(req,res){
    res.send(req.session.name);
});

module.exports = app;
