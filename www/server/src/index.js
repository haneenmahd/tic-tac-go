import crypto from "crypto";
import http from "http";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import Room from "./core/Room.js";
import Queue from "./core/Queue.js";
import { PlayerMove } from "./data/game.js";
import Player from "./core/Player.js";

const PORT = process.env.PORT || 4000;

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

const rooms = [];
const waitingList = new Queue();

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
  const squares = Array(9).fill(null);
  let roomToken;

  socket.on("join-waiting-list", (playerName, side, avatarId) => {
    const player = new Player(socket.id, playerName, side, avatarId);

    socket.player = player;

    waitingList.join(player);
  });

  socket.on("find-player", cb => {
    if (waitingList.queue.length > 0) {
      const partner = waitingList.findRandom();

      if (
        partner.name !== socket.player.name &&
        partner.side !== socket.player.side
      ) {
        roomToken = crypto
          .createHash("sha256")
          .update(partner.id + socket.player.id)
          .digest("hex");

        socket.partner = partner;
        socket.broadcast
          .to(socket.partner.id)
          .emit("player-found", socket.player, roomToken);

        socket.join(roomToken);

        // removing both current player and the opponent
        waitingList.remove(socket.partner);
        waitingList.remove(socket.player);

        cb(socket.partner, roomToken);
      }
    }
  });

  socket.on("join-room", room => {
    console.log(
      `${socket.player.name} with ${socket.partner?.name} in ${room}`
    );

    socket.join(room);
  });

  socket.on("mark", (pos, move, cb) => {
    squares[pos] = move;

    io.to(roomToken).emit("mark", squares);

    cb(squares);
  });

  socket.on("disconnect", () => {
    const player = waitingList.queue.find(player => player.id === socket.id); // id is assigned from socket.id

    waitingList.remove(player);
  });
});

server.listen(PORT, () => {
  console.log(`Listening for connections at http://localhost:${PORT}`);
});
