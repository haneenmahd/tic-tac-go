class Player {
  constructor(id, name, side, avatarId) {
    this.id = id;
    this.name = name;
    this.side = side;
    this.avatarId = avatarId;
    this.score = 0;
  }

  updateScore() {
    this.score += 1;
  }
}

export default Player;
