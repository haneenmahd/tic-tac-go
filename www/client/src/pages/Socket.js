import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Test() {
  const [moves, setMoves] = useState(Array(9).fill(null));
  const name = "Kitni" + Math.round(Math.random() * 1000);
  const socket = io("http://localhost:4000");

  socket.on("connect", () => {
    socket.on("room_join", roomId => {
      socket.emit("join_room", roomId);
    });

    socket.on("room_join_error", ({ error }) => {
      console.error(error);
    });

    socket.on("on_game_update", ({ matrix }) => setMoves(matrix));
  });

  // NOTE: test marking moves
  const handleClick = () => {
    setMoves(Array(9).fill("X"));
  };

  useEffect(() => {
    socket.emit("update_game", { matrix: moves });
  }, [moves]);

  return (
    <div>
      <h1>Testing Socket.io</h1>
      <p>User: {name}</p>

      <button
        onClick={() => {
          socket.emit("join_game", {
            name: name,
            symbol: "x",
            avatarId: "#123",
          });
        }}>
        Join room
      </button>

      {moves}

      <button
        style={{
          color: "#fff",
          backgroundColor: "blue",
          borderRadius: 30,
          padding: 20,
        }}
        onClick={() => handleClick()}>
        MARK MOVE
      </button>
    </div>
  );
}
