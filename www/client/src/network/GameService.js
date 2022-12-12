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
    this.ws.emit("update_game", { matrix });
  }

  onUpdateGame(cb) {
    this.ws.on("on_game_update", ({ matrix }) => cb(matrix));
  }

  updateScore(score) {
    this.ws.emit("update_game_score", { score });
  }

  onUpdateScore(cb) {
    this.ws.on("on_game_score_update", ({ score }) => cb(score));
  }

  nextRound(round) {
    this.ws.emit("next_round", { round });
  }

  onNextRound(cb) {
    this.ws.on("on_next_round", ({ round }) => cb(round));
  }

  clearGame() {
    this.ws.emit("clear_game");
  }

  onClearGame(cb) {
    this.ws.on("on_clear_game", cb);
  }

  onRoomJoinError(cb) {
    this.ws.on("room_join_error", ({ error }) => cb(error));
  }

  calculateWinner(matrix, playerSymbol) {
    // Check rows for a winner
    for (let row = 0; row < matrix.length; row++) {
      if (matrix[row][0] === matrix[row][1] && matrix[row][1] === matrix[row][2]) {
        return matrix[row][0];
      }
    }

    // Check columns for a winner
    for (let col = 0; col < matrix.length; col++) {
      if (matrix[0][col] === matrix[1][col] && matrix[1][col] === matrix[2][col]) {
        return matrix[0][col];
      }
    }

    // Check diagonals for a winner
    if (matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]) {
      return matrix[0][0];
    }

    if (matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0]) {
      return matrix[0][2];
    }

    // If no winners were found, return null
    return null;
  }
}

export default GameService;
