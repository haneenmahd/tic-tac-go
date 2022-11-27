import { Server, Socket } from "socket.io";
import RoomController from "./RoomController";

export default class MainController {
    protected roomController = new RoomController();

    public onConnection(
        socket: Socket,
        io: Server
    ) {
        socket.on("join_game", message => this.roomController.joinGame(socket, message));

        socket.on("join_room", room => this.roomController.joinRoom(socket, room))
    }

    public onDisconnect(
        socket: Socket
    ) {
        socket.on("disconnect", () => {
            this.roomController.removePlayer(socket);
        });
    }
}