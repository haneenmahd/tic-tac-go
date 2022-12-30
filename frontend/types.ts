export type Callback<P, T> = (param: P) => T;

export type CallbackNoParams<T> = () => T;

export type HTTPPort = string | number;

export type PlayerSymbol = "X" | "O";

export type PlayMatrix = Array<Array<string | null>>;