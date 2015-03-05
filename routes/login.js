var express = require('express');
var app = express();
var session = require('express-session');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(8080);

var mongoose = require('mongoose');
var conn = mongoose.createConnection('localhost','prueba');
var user = conn.model("nombres", {name: String});
app.use(session({secret:"123456789",resave: true,saveUninitialized: true}));
////////////////////////////////////////////////////////////////////////////
io.on('connection', function(socket){
    socket.on('new', function(data){
       socket.emit('view', data);
       socket.broadcast.emit('view', data);
    });
 });

app.get('/prueba', function(req, res, next) {
     new user({
        name: "JOJO"
     }).save(function(err,data){
        if(!err){
        	res.send("Si se logro!");
        } 
     });
});



module.exports = app;
