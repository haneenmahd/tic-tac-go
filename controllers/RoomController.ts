import crypto from "crypto";
import { Server, Socket } from "socket.io";
import Player from "./Player";
import type { Players, RoomJoinMessage } from "types";

export default class RoomController {
    players: Players = {};
    roomId?: string;

    public async joinRoom(socket: Socket, room: string) {
        await socket.join(room);
    }

    public async joinGame(
        socket: Socket,
        message: RoomJoinMessage
    ) {
        const player = new Player(socket.id, message.name, message.symbol, message.avatarId);

        this.players[player.id] = player;

        const connectedPlayers = Object.values(this.players).filter(p => p.id !== socket.id && p.isPlaying === false);

        if (connectedPlayers.length > 0 && connectedPlayers[0].symbol !== player.symbol) {
            const opponent = connectedPlayers[0];
            this.roomId = crypto.randomBytes(5).toString("hex");

            // player has started playing
            player.startPlaying();
            socket.emit("room_join_request", this.roomId, opponent);
            socket.to(opponent.id).emit("room_join_request", this.roomId, player);
        }
    }

    public removePlayer(socket: Socket) {
        if (this.players[socket.id]) {
            this.players[socket.id].stopPlaying();
            delete this.players[socket.id]; // socket.id is equivalent to player.id
        }
    }

    protected roomJoinError(socket: Socket) {
        socket.emit("room_join_error", {
            error: "Insufficient amount of players"
        })
    }
}