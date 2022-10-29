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
}

export default GameService;
