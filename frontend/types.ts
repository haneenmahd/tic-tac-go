export type Callback<P, T> = (param: P) => T;

export type CallbackNoParams<T> = () => T;

export interface Player {
    id: string;
    name: string;
    symbol: PlayerSymbol;
    avatarId: string;
    score: number;
    isPlaying: boolean;
    /** player to start the game */
    starter: boolean;
}

export type PlayerSymbol = "X" | "O";

export type PlayMatrix = Array<Array<string | null>>;