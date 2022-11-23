import axios from "axios";
import io from "socket.io-client";

class GameService {
  static apiUrl = "http://localhost:4000";
  static shared = new GameService();
  ws = null;

  /**
   * Initialises the socket.
   *
   * So that the socket is only called when neededs
   */
  init() {
    this.ws = io("ws://localhost:4000");
  }

  async createNewRoom() {
    const res = await axios.post(`${GameService.apiUrl}/rooms/new`);

    return res.data;
  }

  joinWaitingList(playerName, playerside, avatarId) {
    this.ws.emit("join-waiting-list", playerName, playerside, avatarId);
  }

  findPlayer(setOpponent) {
    this.ws.emit("find-player", (partner, roomToken) => {
      setOpponent(partner);

      this.ws.emit("join-room", roomToken);
    });

    this.ws.on("player-found", (player, roomToken) => {
      setOpponent(player);

      this.ws.emit("join-room", roomToken);
    });
  }

  joinRoom(roomToken) {
    this.ws.emit("join-room", roomToken);
  }

  markMove(pos, move, cb) {
    this.ws.emit("mark", pos, move, squares => {
      cb(squares);
    });

    this.ws.on("mark", squares => console.log(squares));
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
