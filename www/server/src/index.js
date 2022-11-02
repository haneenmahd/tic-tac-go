import http from "http";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import Room from "./core/Room.js";
import Queue from "./core/Queue.js";
import { PlayerMove } from "./data/game.js";
import Player from "./core/Player.js";

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

const PORT = process.env.PORT || 4000;

const rooms = [];
const queuedPlayers = new Queue();

app.get("/player/find", (req, res) => {
  const player = queuedPlayers.findRandom();

  res.status(200).send(player);
});

app.get("/rooms/info/:roomId", (req, res) => {
  const { roomId } = req.params;

  const room = rooms.find(room => room.id === roomId);

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
  });
});

io.on("connection", socket => {
  socket.on("join-waiting-list", (playerName, side) => {
    const player = new Player(socket.id, playerName, side);

    queuedPlayers.join(player);
  });

  // USE ".once" if there is an error
  socket.on("join", (roomId, playerName, cb) => {
    const room = rooms.find(room => room.id === roomId);

    const side = room.players.find(player => player.side === PlayerMove.X)
      ? PlayerMove.O
      : PlayerMove.X;

    if (room.addPlayer(socket.id, playerName, side)) {
      console.log(`${socket.id} has now joined room #${roomId}`);

      socket.join(roomId);

      socket.broadcast.emit("join");

      cb(side, room.squares);
    } else {
      cb(null, null);
    }
  });

  socket.on("mark", (roomId, pos, move, cb) => {
    const room = rooms.find(room => room.id === roomId);

    room.squares[pos] = move;

    io.to(roomId).emit("mark", room.squares);

    cb(room.squares);
  });

  socket.on("disconnect", () => {
    const player = queuedPlayers.queue.find(player => player.id === socket.id); // id is assigned from socket.id

    queuedPlayers.remove(player);

    console.log("KICKING OUT", player);
  });
});

server.listen(PORT, () => {
  console.log(`Listening for connections at http://localhost:${PORT}`);
});
