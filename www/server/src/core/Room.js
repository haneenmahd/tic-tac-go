import Player from "./Player.js";
import generateId from "../utils/generateId.js";
import { PlayerMove } from "../data/game.js";

class Room {
  constructor() {
    this.id = generateId();
    this.players = [];
    this.squares = Array(9).fill(null);
  }

  addPlayer(id, name, side) {
    if (this.players.length !== 2) {
      // MAX Member count is 2

      const player = new Player(id, name, side);

      this.players.push(player);

      return true;
    }

    return false;
  }

  addMove(i, move) {
    if (this.squares[i] === null && this.validateMove(move)) {
      this.squares[i] = move;

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

export default Room;
