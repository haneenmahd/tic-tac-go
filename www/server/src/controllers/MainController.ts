import { Server, Socket } from "socket.io";
import GameController from "./GameController";
import RoomController from "./RoomController";

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
    }

    public onDisconnect(
        socket: Socket
    ) {
        socket.on("disconnect", () => {
            this.roomController.removePlayer(socket);
        });
    }
}