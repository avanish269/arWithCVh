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
    var spawn = require("child_process").spawn;
    var pythonProcess = spawn('python',["testScript.py"]);
    pythonProcess.stdin.write(data.data2);
    pythonProcess.stdin.end();
    pythonProcess.stdout.on('data', (data)=>{
      console.log(data.toString());
      //send result to client
      socket.send(data.toString());
      // socket.emit()



    });
    pythonProcess.stderr.on('data', (data)=>{
      console.log(data.toString());
    });
    // pythonProcess.on('exit', (code)=>{
    //   console.log("Code:"+code);
    // });
  });
}
