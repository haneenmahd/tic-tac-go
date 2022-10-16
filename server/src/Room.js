const Player = require("./Player");
const generateId = require("./utils/generateId");

class Room {
  constructor() {
    this.id = generateId();
    this.players = [];
    this.squares = Array(9).fill(null);
  }

  addPlayer(id) {
    if (this.players.length !== 2) {
      // MAX Member count is 2

      const player = new Player(id);

      this.players.push(player);

      return true;
    }

    return false;
  }

  addMove(i, move) {
    if (this.squares[i] === null) {
      this.squares[i] = move;

      return true;
    }

    return false;
  }
}

module.exports = Room;
