const app = require('express')();
const http = require('http').createServer(app);
// import bodyParser from 'body-parser';
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))
const io = require("socket.io")(http, {
	cors: {
		origins: [
			"http://localhost:3001",
			"http://localhost:4200",
			"http://localhost:8080",
		],
	},
});
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log('token', token);
  next();
});
var flag=false
app.get('/', (req, res) => {
  const notify = {data: "req.body"};
  // sendNotification() // Updates Live Notification
  res.send(notify);
  io.emit('my message', 'Hellonnnnn.');
});
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  // socket.on('my message', (msg) => {
  //   console.log('message: ' + msg);
  //   io.emit('my broadcast', `server: ${msg}`);
  // });
  socket.emit('my message', 'Hello there from node Hello again.');
  // if (!socket) return(true);
  // socket.on('my broadcastnode ', msg => {
  //   console.log('node event received!');
  //   return cb(null, msg);
  // });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
