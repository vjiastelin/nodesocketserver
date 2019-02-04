var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

/*
app.get('/',function (req,res) {
   res.sendFile(__dirname + '/index.html')
});
*/

app.get('/',function (req, res) {
    res.send("Welcome to socket server");
});



io.on('connection', function (socket) {
    console.log('one user connected : '+socket.id);
    socket.on('chat message', function (data) {
        console.log('Message is :', data)
        io.emit('chat message', data)
    });
    
    socket.on('disconnect',function () {
       console.log('user disconnected')
    });


});





http.listen(3000,function () {
    console.log('listening on localhost:3000')
});