import type { PlayerSymbol } from "src/types";

class Player {
  id: string;
  name: string;
  symbol: PlayerSymbol;
  avatarId: string;
  score: number;
  isPlaying: boolean;
  /** player to start the game */
  starter: boolean;

  constructor(id: string, name: string, symbol: PlayerSymbol, avatarId: string) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.score = 0;
    this.isPlaying = false;
    this.avatarId = avatarId;
    this.starter = symbol === "X" ? true : false;
  }

  updateScore() {
    this.score += 1;
  }

  startPlaying() {
    this.isPlaying = true;
  }

  stopPlaying() {
    this.isPlaying = false;
  }
}

export default Player;
