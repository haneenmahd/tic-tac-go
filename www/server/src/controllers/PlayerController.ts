import { PlayerMove } from "src/types";

class PlayerController {
  id: string;
  name: string;
  move: PlayerMove;
  avatarId: string;
  score: number;
  
  constructor(id: string, name: string, move: PlayerMove, avatarId: string) {
    this.id = id;
    this.name = name;
    this.move = move;
    this.avatarId = avatarId;
    this.score = 0;
  }

  updateScore() {
    this.score += 1;
  }
}

export default PlayerController;
