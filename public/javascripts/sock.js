var constraints={video: {facingMode: "environment"}, audio: false};
var cameraView=document.querySelector("#camera--view");
var cameraOutput=document.querySelector("#camera--output");
var cameraSensor=document.querySelector("#camera--sensor");
var arobj = document.querySelector("#clippedDiv");
var ctx=cameraSensor.getContext("2d");
var blobURL="";
var w = screen.width;
var h = screen.height;
w = document.documentElement.clientWidth;
h = document.documentElement.clientHeight;
cameraSensor.style.display="none";
cameraView.width=w;
cameraView.height=h;
arobj.style.width=w;
arobj.style.height=h;
// cameraView.style.display="none";
cameraOutput.style.display="none";

function cameraStart(){
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
    track=stream.getTracks()[0];
    cameraView.srcObject=stream;
  }).catch(function(error){
    console.error("Oops. Something is broken.", error);
  });
}

setInterval(cameraT, 1000);
function cameraT(){
  cameraSensor.width=cameraView.videoWidth;
  cameraSensor.height=cameraView.videoHeight;
  // cameraSensor.width=window.innerWidth;
  // cameraSensor.height=window.innerHeight;
  // console.log(window.innerHeight);
  // cameraView.width=window.innerWidth;
  // cameraView.height=window.innerHeight;
  // arobj.style.width=window.innerWidth;
  // arobj.style.height=window.innerHeight;
  // arobj.style.display = "none";
  ctx.translate(cameraSensor.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(cameraView, 0, 0);
  ctx.translate(cameraSensor.width, 0);
  ctx.scale(-1, 1);
  cameraSensor.toBlob(function(blob){
    blobURL=URL.createObjectURL(blob);
  }, 'image/png');
  cameraOutput.src=cameraSensor.toDataURL();
  var socket=io.connect(location.origin);
  // console.log(cameraOutput.src);
  socket.emit('Image Data', {data1: blobURL, data2: cameraOutput.src});
  console.log('sent')
  socket.on('message', function(data){
    // cord_t = data;
    // console.log(data)
    fin = parseInt(data) % 2
    // if (fin == 0) {
    //   arobj.style.display = "none";
    // } else {
    //
    // }
    console.log(fin)
  });
}



window.addEventListener("load", cameraStart, false);
