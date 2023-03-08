import OSymbol from "assets/svg/O.svg";
import XSymbol from "assets/svg/X.svg";
import { PlayerSymbol } from "types";

export const QUERIES = {
    large: "min-width: 768px",
    medium: "min-width: 600px",
    small: "max-width: 768px"
};

export const COLORS = {
    black: "#000",
    gray: "#8B8B8B",
    white: "#FFF",
    blue: "#DCF0F0",
    fadedBlue: "#F6FDFD",
    fadedGray: "#ECECEC",
    lightGray: "#DFDFDF",
    hoverTextBlack: "#00000050",
    hoverBackground: "#00000010",
    secondaryHoverBackground: "#BDE3E3"
};

export const TRANSITIONS = {
    hovers: "150ms cubic-bezier(0.72, 0.04, 0.04, 1.01)",
    focus: "200ms cubic-bezier(0.72, 0.04, 0.04, 1.01)",
    load: "cubic-bezier(0.69, -0.03, 0.2, 1)",
    smoothHovers: "cubic-bezier(0.57, 0.38, 0.26, 0.95)"
};

export const symbols: {
    [name: string]: PlayerSymbol
} = {
    X: "X",
    O: "O",
};

export const symbolImages: {
    [name: string]: string
} = {
    X: XSymbol,
    O: OSymbol,
}