import io, { Socket } from "socket.io-client";
import type { Callback, CallbackNoParams, Player, PlayMatrix, PlayerSymbol } from "types";

class GameService {
    static shared = new GameService();

    ws: Socket | null = null; // switch to using undefined instead

    /**
     * Initialises the socket.
     *
     * So that the socket is only called when neededs
     */
    async init() {
        const url = process.env.NODE_ENV === "development" ?
            "http://localhost:4000" :
            "https://tic-tac-go-production.up.railway.app";

        this.ws = io(url!, { transports: ["websocket"] });
    }

    /**
     * A simple wrapper function for `socket.on("connect")`
     * @param {void} cb
     */
    onConnect(cb: CallbackNoParams<void>) {
        if (this.ws) {
            this.ws.on("connect", cb);
        }
    }

    joinRoom(room: string) {
        if (this.ws) {
            this.ws.emit("join_room", room);
        }
    }

    onRoomJoinRequest(cb: Callback<Player, void>) {
        if (this.ws) {
            this.ws.on("room_join_request", (roomId, opponent) => {
                this.joinRoom(roomId);

                cb(opponent);
            });
        }
    }

    joinGame(
        name: string,
        symbol: PlayerSymbol,
        avatarId: string,
        cb: CallbackNoParams<void>
    ) {
        if (this.ws) {
            this.ws.emit("join_game", {
                name,
                symbol,
                avatarId,
            });

            cb();
        }
    }

    updateGame(matrix: PlayMatrix) {
        if (this.ws) {
            this.ws.emit("update_game", { matrix });
        }
    }

    onUpdateGame(cb: Callback<PlayMatrix, void>) {
        if (this.ws) {
            this.ws.on("on_game_update", ({ matrix }) => cb(matrix));
        }
    }

    updateScore(score: number) {
        if (this.ws) {
            this.ws.emit("update_game_score", { score });
        }
    }

    onUpdateScore(cb: Callback<number, void>) {
        if (this.ws) {
            this.ws.on("on_game_score_update", ({ score }) => cb(score));
        }
    }

    nextRound(round: number) {
        if (this.ws) {
            this.ws.emit("next_round", { round });
        }
    }

    onNextRound(cb: Callback<number, void>) {
        if (this.ws) {
            this.ws.on("on_next_round", ({ round }) => cb(round));
        }
    }

    clearGame() {
        if (this.ws) {
            this.ws.emit("clear_game");
        }
    }

    onClearGame(cb: CallbackNoParams<void>) {
        if (this.ws) {
            this.ws.on("on_clear_game", cb);
        }
    }

    gameOver() {
        if (this.ws) {
            this.ws.emit("game_over");
        }
    }

    onGameOver(cb: CallbackNoParams<void>) {
        if (this.ws) {
            this.ws.on("on_game_over", cb);
        }
    }

    onRoomJoinError(cb: Callback<string, void>) {
        if (this.ws) {
            this.ws.on("room_join_error", ({ error }) => cb(error));
        }
    }

    calculateWinner(matrix: PlayMatrix) {
        // Check rows for a winner
        for (let row = 0; row < matrix.length; row++) {
            if (matrix[row][0] === matrix[row][1] && matrix[row][1] === matrix[row][2]) {
                return matrix[row][0];
            }
        }

        // Check columns for a winner
        for (let col = 0; col < matrix.length; col++) {
            if (matrix[0][col] === matrix[1][col] && matrix[1][col] === matrix[2][col]) {
                return matrix[0][col];
            }
        }

        // Check diagonals for a winner
        if (matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]) {
            return matrix[0][0];
        }

        if (matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0]) {
            return matrix[0][2];
        }

        // If no winners were found, return null
        return null;
    }
}

export default GameService;
