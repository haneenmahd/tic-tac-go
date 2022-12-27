import { Server, Socket } from "socket.io";
import GameController from "controllers/GameController";
import RoomController from "controllers/RoomController";

export default class MainController {
    protected roomController = new RoomController();
    protected gameController = new GameController();

    public onConnection(
        socket: Socket,
        io: Server
    ) {
        socket.on("join_game", message => this.roomController.joinGame(socket, message));
        socket.on("join_room", room => this.roomController.joinRoom(socket, room));
        socket.on("update_game", message => this.gameController.updateGame(socket, this.roomController.roomId!, message));
        socket.on("update_game_score", message => this.gameController.updateScore(socket, this.roomController.roomId!, message));
        socket.on("next_round", message => this.gameController.nextRound(socket, this.roomController.roomId!, message));
        socket.on("clear_game", () => this.gameController.clearGame(socket, this.roomController.roomId!));
        socket.on("game_over", () => this.gameController.gameOver(socket, this.roomController.roomId!))
    }

    public onDisconnect(
        socket: Socket
    ) {
        socket.on("disconnect", () => {
            this.roomController.removePlayer(socket);
        });
    }
}