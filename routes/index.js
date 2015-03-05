var express = require('express');
var app = express();
var session = require('express-session');
app.use(session({secret:"123456789",resave: true,saveUninitialized: true,cookie: {maxAge: 1000000000000}}));

var mongoose = require('mongoose');
var conn = mongoose.createConnection('localhost','prueba');
var user = conn.model("nombres", {name: String});

app.post('/login', function(req,res,next){
  user.findOne({name: req.body.usuario},function(err,data){
    if(data){
      req.session.name = data.name;
      res.json({status: 200});
    }else{
      res.json({status: 201});
    }
  });
});

app.get('/', function(req, res, next) {
    res.render('index',{id: req.session.name});
});

app.get('/logout',function(req,res){
    req.session.destroy(function(err){
       if(!err){
       	  res.redirect('/');
       }
    });
});

module.exports = app;
