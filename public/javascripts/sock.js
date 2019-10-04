var constraints={video: {facingMode: "environment"}, audio: false};
var cameraView=document.querySelector("#camera--view");
var cameraOutput=document.querySelector("#camera--output");
var cameraSensor=document.querySelector("#camera--sensor");
var ctx=cameraSensor.getContext("2d");

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
  cameraOutput.src=cameraSensor.toDataURL();
  console.log(cameraOutput.src);
}

window.addEventListener("load", cameraStart, false);
