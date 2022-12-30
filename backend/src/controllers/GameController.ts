import { Server, Socket } from "socket.io";
import type { NextRoundMessage, UpdateGameMessage, UpdateScoreMessage } from "types";

class GameController {
    public async updateGame(
        socket: Socket,
        gameRoom: string,
        message: UpdateGameMessage
    ) {
        socket.broadcast.to(gameRoom).emit("on_game_update", message);
    }

    public async updateScore(
        socket: Socket,
        gameRoom: string,
        message: UpdateScoreMessage
    ) {
        socket.broadcast.to(gameRoom).emit("on_game_score_update", message);
    }

    public async nextRound(
        socket: Socket,
        gameRoom: string,
        message: NextRoundMessage
    ) {
        socket.broadcast.to(gameRoom).emit("on_next_round", message);
    }

    public async clearGame(
        socket: Socket,
        gameRoom: string
    ) {
        socket.broadcast.to(gameRoom).emit("on_clear_game");
    }

    public async gameOver(
        socket: Socket,
        gameRoom: string
    ) {
        socket.broadcast.to(gameRoom).emit("on_game_over");
    }
}

export default GameController;