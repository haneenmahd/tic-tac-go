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
  const squares = Array(9).fill(null);

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
        socket.roomToken = crypto
          .createHash("sha256")
          .update(partner.id + socket.player.id)
          .digest("hex");

        socket.partner = partner;
        socket.broadcast
          .to(socket.partner.id)
          .emit("player-found", socket.player, socket.roomToken);

        socket.join(socket.roomToken);

        // removing both current player and the opponent
        waitingList.remove(socket.partner);
        waitingList.remove(socket.player);

        cb(socket.partner, socket.roomToken);
      }
    }
  });

  socket.on("join-room", room => {
    socket.join(room);
  });

  socket.on("mark", (pos, move, cb) => {
    squares[pos] = move;

    socket.to(socket.roomToken).emit("mark", squares);

    console.log(socket.rooms);

    cb(squares);
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
