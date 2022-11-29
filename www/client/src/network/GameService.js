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

  calculateWinner(matrix, playerSymbol) {
    for (let i = 0; i < matrix.length; i++) {
      let row = [];

      for (let j = 0; j < matrix.length; j++) {
        row.push(matrix[i][j]);
      }

      if (row.every(value => value && value === playerSymbol)) {
        return true;
      } else if (row.every(value => value && value !== playerSymbol)) {
        return false;
      }
    }

    for (let i = 0; i < matrix.length; i++) {
      let column = [];

      for (let j = 0; j < matrix.length; j++) {
        column.push(matrix[j][i]);
      }

      if (column.every(value => value && value === playerSymbol)) {
        return true;
      } else if (column.every(value => value && value !== playerSymbol)) {
        return false;
      }
    }

    if (matrix[1][1]) {
      if (matrix[0][0] === matrix[1][1] && matrix[2][2] === matrix[1][1]) {
        if (matrix[1][1] === playerSymbol) {
          return true;
        } else {
          return false;
        }
      }

      if (matrix[2][0] === matrix[1][1] && matrix[0][2] === matrix[1][1]) {
        if (matrix[1][1] === playerSymbol) {
          return true;
        } else {
          return false;
        }
      }
    }

    if (matrix.every(m => m.every(v => v !== playerSymbol))) return undefined; // a tie

    return null;
  }
}

export default GameService;
