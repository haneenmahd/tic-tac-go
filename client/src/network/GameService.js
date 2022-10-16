import axios from "axios";

class GameService {
  static apiUrl = "http://localhost:3001";
  static shared = new GameService();

  async createNewRoom() {
    const res = await axios.post(`${GameService.apiUrl}/rooms/new`);

    return res.data;
  }
}

export default GameService;
