import Player from "./game/Player";

export type HTTPPort = string | number;

export type Players = {
    [id: string]: Player;
}

export type PlayerSymbol = "X" | "O";

export type PlayMatrix = Array<Array<string | null>>;

export interface HTTPError extends Error {
    syscall: string;
    code: "EACCES" | "EADDRINUSE";
}

export interface RoomJoinMessage {
    name: string,
    symbol: PlayerSymbol,
    avatarId: string;
}

export interface UpdateGameMessage {
    matrix: PlayMatrix;
}

export interface UpdateScoreMessage {
    score: number;
}

export interface NextRoundMessage {
    round: number;
}