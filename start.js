var app=require('./app');
var server=require('http').Server(app);
var io=require('socket.io')(server);
var cv=require('opencv4nodejs');
var wCap=new cv.VideoCapture(0);

var FPS=10;

setInterval(function sio(){
  var frame=wCap.read();
  var image=cv.imencode('.jpg', frame).toString('base64');
  io.emit('image', image);

}, 1000/FPS)

var ser=server.listen(8000, serverFunc);

function serverFunc(){
  console.log(`Express is running on port ${server.address().port}`);
}
