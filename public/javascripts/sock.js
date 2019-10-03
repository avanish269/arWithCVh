var socket=io.connect('http://localhost:8000');
socket.on('image', (imag)=>{
  var image=document.getElementById('image');
  image.src=`data:image/jpeg;base64,${imag}`;
})
