window.onload = function() {
    
    var socket = io.connect('http://localhost:3700');
    var content = document.getElementById("content");
    //var canvas = document.getElementById('paper'),
    //c = canvas.getContext('2d');
   
    //c.fillStyle = "black";
    //c.fillRect = (0, 0, canvas.width, canvas.height);
    
    //c.draw
   
    socket.on('message', function (data) {
    
    content.innerHTML = data.message;
    
    
    });
    
    setInterval(function () {
        socket.emit('send', { message: '' });
    },1000)
 
    
     
	
}