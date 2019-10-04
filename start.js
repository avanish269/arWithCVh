var app=require('./app');
var server=require('http').Server(app);
var io=require('socket.io')(server);

var ser=server.listen(8000, serverFunc);

function serverFunc(){
  console.log(`Express is running on port ${server.address().port}`);
}
