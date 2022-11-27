import Player from "./game/Player";

export type HTTPPort = string | number;

export type Players = {
    [id: string]: Player;
}

export type PlayMatrix = Array<Array<string | null>>;

export interface HTTPError extends Error {
    syscall: string;
    code: "EACCES" | "EADDRINUSE";
}

export interface RoomJoinMessage {
    name: string,
    symbol: PlayerSymbol,
    avatarId: string;
    score: number;
}

export interface UpdateGameMessage {
    matrix: PlayMatrix;
}

export enum PlayerSymbol {
    X,
    O
}
