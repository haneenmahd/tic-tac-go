const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();

const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Listening for connections at ws://localhost:${PORT}`);
});
