var express=require('express');
var routes=require('./routes/index');
var app=express();

app.use(express.static(__dirname + '/public/'));

app.use('/', routes);

module.exports=app;
