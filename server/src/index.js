const http = require("http");
const cors = require("cors");
const express = require("express");
const socketio = require("socket.io");
const Room = require("./Room");
const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = socketio(server, {
  cors: corsOptions,
});
const PORT = process.env.PORT || 3001;

const rooms = [];

app.post("/rooms/new", (req, res) => {
  const room = new Room();

  rooms.push(room);

  res.send({
    id: room.id,
    message: `Created room successfully #${room.id}`,
  });
});

io.on("connection", (socket) => {
  socket.on("join", (id) => {
    rooms.find((room) => room.id === id); // DEBUG
    io.emit("join", id);
  });
});

server.listen(PORT, () => {
  console.log(`Listening for connections at http://localhost:${PORT}`);
});

// validate moves
