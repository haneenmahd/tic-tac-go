const http = require("http");
const cors = require("cors");
const express = require("express");
const socketio = require("socket.io");
const Room = require("./Room");
const Player = require("./Player");
const { PlayerMove } = require("./data/game");
const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = socketio(server, {
  cors: corsOptions,
});

const PORT = process.env.PORT || 4000;

const rooms = [];

app.get("/rooms/info/:roomId", (req, res) => {
  const { roomId } = req.params;

  const room = rooms.find((room) => room.id === roomId);

  res.status(200).send({
    playerCount: room.players.length,
    squares: room.squares,
  });
});

app.post("/rooms/new", (req, res) => {
  const room = new Room();

  rooms.push(room);

  res.status(200).send({
    id: room.id,
    message: `Created room successfully #${room.id}`,
  });
});

io.on("connection", (socket) => {
  socket.once("join", (roomId, cb) => {
    const room = rooms.find((room) => room.id === roomId);

    const side = room.players.find((player) => player.side === PlayerMove.X)
      ? PlayerMove.O
      : PlayerMove.X;

    if (room.addPlayer(socket.id, side)) {
      console.log(`${socket.id} has now joined room #${roomId}`);

      socket.join(roomId);

      socket.broadcast.emit("join");

      cb(side, room.squares);
    } else {
      cb(null, null);
    }
  });

  socket.on("mark", (roomId, pos, move, cb) => {
    const room = rooms.find((room) => room.id === roomId);

    room.squares[pos] = move;

    io.to(roomId).emit("mark", room.squares);

    cb(room.squares);
  });
});

server.listen(PORT, () => {
  console.log(`Listening for connections at http://localhost:${PORT}`);
});
