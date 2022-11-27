import { PlayerSymbol } from "src/types";

class Player {
  id: string;
  name: string;
  symbol: PlayerSymbol;
  avatarId: string;
  score: number;
  isPlaying: boolean;
  
  constructor(id: string, name: string, symbol: PlayerSymbol, avatarId: string) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.avatarId = avatarId;
    this.score = 0;
    this.isPlaying = false;
  }

  updateScore() {
    this.score += 1;
  }

  startPlaying() {
    this.isPlaying = true;
  }
}

export default Player;
