class Player {
  constructor(id, name, side) {
    this.id = id;
    this.name = name;
    this.side = side; // DEBUG
    this.ready = false;
  }

  makeReady() {
    this.ready = true;
  }
}

export default Player;
