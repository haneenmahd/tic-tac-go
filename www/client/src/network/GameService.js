import axios from "axios";
import io from "socket.io-client";

class GameService {
  static apiUrl = "http://localhost:4000";
  static shared = new GameService();
  ws = null;

  /**
   * Initialises the socket.
   *
   * So that the socket is only called when neededs
   */
  init() {
    this.ws = io("ws://localhost:4000");
  }

  /**
   * A simple wrapper function for `socket.on("connect")`
   * @param {void} cb
   */
  onConnect(cb) {
    this.ws.on("connect", cb);
  }

  joinRoom(room) {
    this.ws.emit("join_room", room);
  }

  onRoomJoinRequest(cb) {
    this.ws.on("room_join_request", (roomId, opponent) => {
      this.joinRoom(roomId);

      cb(opponent);
    });
  }

  joinGame(name, symbol, avatarId, cb) {
    this.ws.emit("join_game", {
      name,
      symbol,
      avatarId,
    });

    cb();
  }

  updateGame(matrix) {
    this.ws.emit("update_game", {
      matrix,
    });
  }

  onUpdateGame(cb) {
    this.ws.on("on_game_update", ({ matrix }) => cb(matrix));
  }

  onRoomJoinError(cb) {
    this.ws.on("room_join_error", ({ error }) => cb(error));
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  }
}

export default GameService;
