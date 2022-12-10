import { Server, Socket } from "socket.io";
import type { UpdateGameMessage, UpdateScoreMessage } from "src/types";

class GameController {
    public async updateGame(
        socket: Socket,
        gameRoom: string,
        message: UpdateGameMessage
    ) {
        socket.broadcast.to(gameRoom).emit("on_game_update", message);
    }

    // when you are recieving a score update it is a opponent's score update
    // if you are sending you are updating your score.
    public async updateScore(
        socket: Socket,
        gameRoom: string,
        message: UpdateScoreMessage
    ) {
        socket.broadcast.to(gameRoom).emit("on_game_score_update", message);
    }

    public async clearGame(
        socket: Socket,
        gameRoom: string
    ) {
        socket.broadcast.to(gameRoom).emit("on_clear_game");
    }
}

export default GameController;