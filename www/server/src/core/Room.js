class Room {
  constructor(roomId, squares) {
    this.roomId = roomId;
    this.squares = squares;
  }

  updateSqaures(squares) {
    this.squares = squares;
  }
}

export default Room;
