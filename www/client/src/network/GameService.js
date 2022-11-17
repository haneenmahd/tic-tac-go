import axios from "axios";
import io from "socket.io-client";

class GameService {
  static apiUrl = "http://localhost:4000";
  static shared = new GameService();
  ws = io("ws://localhost:4000");

  async createNewRoom() {
    const res = await axios.post(`${GameService.apiUrl}/rooms/new`);

    return res.data;
  }

  joinWaitingList(playerName, playerside, avatarId) {
    this.ws.emit("join-waiting-list", playerName, playerside, avatarId);
  }

  findPlayer(setOpponent) {
    this.ws.emit("find-player", partner => {
      setOpponent(partner);
    });

    this.ws.on("player-found", player => {
      setOpponent(player);
    });
  }

  joinRoom(roomId, cb) {
    this.ws.emit("join", roomId, (side, squares) => {
      cb(side, squares);
    });
  }

  markMove(roomId, pos, move, cb) {
    this.ws.emit("mark", roomId, pos, move, squares => {
      cb(squares);
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  }
}

export default GameService;
