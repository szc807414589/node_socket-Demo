const express = require('express')
const app = express()

var server = require('http').Server(app);
var io = require('socket.io')(server);

/*静态资源*/
app.use(express.static(__dirname));

server.listen(3000);

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/ws.html');
});

io.on('connection', function (socket) {
	socket.emit('message', {hello: 'world'});
	socket.on('chat', data => {
		io.emit('chat', data);
	})
});

