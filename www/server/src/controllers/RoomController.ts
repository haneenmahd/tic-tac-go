import crypto from "crypto";
import { Server, Socket } from "socket.io";
import { Players, RoomJoinMessage } from "src/types";
import Player from "../game/Player";

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

        if (connectedPlayers.length > 0) {
            const opponent = connectedPlayers[0];
            this.roomId = crypto.randomBytes(5).toString("hex");

            // player has started playing
            player.startPlaying();
            socket.emit("room_join", this.roomId)
            socket.to(opponent.id).emit("room_join", this.roomId);

            // start game with an initial starting player
            // the player will be the one with symbol x
            // emit a new event
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