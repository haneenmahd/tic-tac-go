const http = require("http");
const cors = require("cors");
const express = require("express");
const socketio = require("socket.io");
const Room = require("./Room");
const Player = require("./Player");
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

    if (room.addPlayer(socket.id)) {
      console.log(`${socket.id} has now joined room #${roomId}`);

      socket.join(roomId);

      socket.broadcast.emit("join");
    } else {
      cb(`${socket.id} cannot join due to maximum players!`);
      // BUG: does not allow new members to join in the `Room`
    }
  });

  socket.once("mark", (roomId, pos, move, cb) => {
    const room = rooms.find((room) => room.id === roomId);

    room.squares[pos] = move;

    io.to(roomId).emit("mark", room.squares);

    cb(room.squares);
  });
});

server.listen(PORT, () => {
  console.log(`Listening for connections at http://localhost:${PORT}`);
});

// validate moves ✅
// emit info about room ❌
// emit moves using WS ❌
// mark moves ❌
// fix room member updation, cannot remove a person and add another ❌
