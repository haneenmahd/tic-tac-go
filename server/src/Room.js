const Player = require("./Player");
const generateId = require("./utils/generateId");

class Room {
  constructor() {
    this.id = generateId();
    this.players = [];
    this.squares = Array(9).fill(null);
  }

  addPlayer(id, side) {
    if (this.players.length !== 2) {
      // MAX Member count is 2

      const player = new Player(id, side);

      this.players.push(player);

      return true;
    }

    return false;
  }

  addMove(i, move) {
    if (this.squares[i] === null && this.validateMove(move)) {
      this.squares[i] = move;

      console.log(move);

      return true;
    }

    return false;
  }

  validateMove(move) {
    if (move !== PlayerMove.X && move !== PlayerMove.O) {
      return false;
    }

    return true;
  }
}

module.exports = Room;
