var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 8080;
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





http.listen(port,function () {
    console.log('listening on localhost:' + port)
});