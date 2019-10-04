var constraints={video: {facingMode: "environment"}, audio: false};
var cameraView=document.querySelector("#camera--view");
var cameraOutput=document.querySelector("#camera--output");
var cameraSensor=document.querySelector("#camera--sensor");
var ctx=cameraSensor.getContext("2d");
var blobURL="";
cameraSensor.style.display="none";
cameraView.style.display="none";

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
  console.log(cameraOutput.src);
  socket.emit('Image Data', {data1: blobURL, data2: cameraOutput.src});
}

window.addEventListener("load", cameraStart, false);
