var app=require('./app');
var server=require('http').Server(app);
var io=require('socket.io')(server);

var ser=server.listen(process.env.PORT || 8000, serverFunc);

function serverFunc(){
  console.log(`Express is running on port ${server.address().port}`);
}

io.on('connection', transfer);

function transfer(socket){
  socket.on('Image Data', (data)=>{
    console.log(data[0]+data[1]+data[2]+data[3]+data[4]+data[5]);
  });
}
