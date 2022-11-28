import { Server, Socket } from "socket.io";
import { UpdateGameMessage } from "src/types";

class GameController {
    public async updateGame(
        socket: Socket, 
        io: Server,
        gameRoom: string,
        message: UpdateGameMessage
    ) {
        socket.broadcast.to(gameRoom).emit("on_game_update", message);
    }
}

export default GameController;