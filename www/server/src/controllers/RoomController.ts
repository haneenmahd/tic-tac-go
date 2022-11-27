import crypto from "crypto";
import { Server, Socket } from "socket.io";
import socket from "src/socket";
import { Players, RoomJoinMessage } from "src/types";
import Player from "../game/Player";

export default class RoomController {
    players: Players = {};

    public async joinRoom(socket: Socket, room: string) {
        socket.join(room);
    }
    
    public async joinGame(
        socket: Socket,
        message: RoomJoinMessage
    ) {
        const player = new Player(socket.id, message.name, message.symbol, message.avatarId);

        this.players[player.id] = player;

        const connectedPlayers = Object.values(this.players).filter(p => p.id !== socket.id && p.isPlaying === false);

        if (connectedPlayers.length > 0) {
            const opponent = connectedPlayers[0];
            const roomId = crypto.randomBytes(5).toString("hex");

            // player has started playing
            player.startPlaying();
            socket.emit("room_join", roomId)
            socket.to(opponent.id).emit("room_join", roomId);
        } else {
            this.roomJoinError(socket);
        }
    }

    public removePlayer(socket: Socket) {
        delete this.players[socket.id]; // socket.id is equivalent to player.id
    }

    protected roomJoinError(socket: Socket) {
        socket.emit("room_join_error", {
            error: "Insufficient amount of players"
        })
    }
}