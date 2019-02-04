const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const _ = require('underscore')

const port = process.env.PORT || 3000;
/*
app.get('/',function (req,res) {
   res.sendFile(__dirname + '/index.html')
});
*/

app.get('/',function (req, res) {
    res.send("Welcome to socket server");
});

var clients = {};



io.on('connection', function (socket) {
    console.log('one user connected : '+socket.id);
    //clients[socket.id] = {result: 0};


    socket.on('chat message', function (data) {
        console.log('Message is :', data)
    });

    socket.on('send result', function (data) {
        console.log(socket.id + ' result is :', data);
        clients[socket.id] = {result: data};
        console.log(Object.values(clients).length);
        if (Object.keys(clients).length > 1){
            const winner = _.max(Object.keys(clients), function (o) {
                return clients[o].result;
            });
            console.log(winner);
            const client = io.sockets.connected[winner];
            client.emit('send result', {result: 'You won'});
        }
    });

    socket.on('disconnect',function () {
        delete clients[socket.id];
        console.log('user disconnected');

    });


});





http.listen(port,function () {
    console.log('listening on localhost:' + port)
});