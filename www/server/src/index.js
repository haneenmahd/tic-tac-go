import crypto from "crypto";
import http from "http";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
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

const waitingList = new Queue();

io.on("connection", socket => {
  const data = {
    player: null,
    roomToken: null,
    partner: null,
    squares: null,
  }; // use shared scores with roomid instead of unique ones

  socket.on("join-room", room => {
    socket.join(room);
  });

  socket.on("join-waiting-list", (playerName, side, avatarId) => {
    const player = new Player(socket.id, playerName, side, avatarId);

    data.player = player;

    waitingList.join(data.player);
  });

  socket.on("find-player", cb => {
    if (waitingList.queue.length > 0) {
      const partner = waitingList.findRandom();

      if (
        data.player.name !== partner.name &&
        data.player.side !== partner.side
      ) {
        data.partner = partner;

        socket.broadcast
          .to(data.partner.id)
          .emit("player-found", data.player, data.roomToken);

        socket.join(data.roomToken);

        // removing both current player and the opponent
        waitingList.remove(data.partner);
        waitingList.remove(data.player);

        cb(data.partner, data.roomToken);
      }
    }
  });

  socket.on("mark", (pos, move, cb) => {
    data.squares[pos] = move;

    socket.broadcast.to(data.roomToken).emit("opponent-mark", data.squares);

    cb(data.squares);
  });

  socket.on("disconnect", () => {
    const player = waitingList.queue.find(player => player.id === socket.id); // id is assigned from socket.id

    waitingList.remove(player);

    socket.disconnect();
  });
});

server.listen(PORT, () => {
  console.log(`Listening for connections at http://localhost:${PORT}`);
});
