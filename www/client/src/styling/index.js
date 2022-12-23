import styled from "styled-components";

export const QUERIES = {
  large: "min-width: 801px",
  small: "max-width: 480px"
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

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || "row"};
  align-items: ${props => props.alignment || "center"};
  justify-content: ${props => props.justify || "center"};
  gap: ${props => props.gap};
`;

export const Divider = styled.div`
  width: ${props => (props.fit ? "10%" : props.maxWidth ? "100%" : "405px")};
  height: 1px;
  background-color: ${COLORS.fadedGray};
`;

export const PadBox = styled.div`
  padding: ${props => props.padding};
`;

export const ClippedAndRounded = styled.div`
  border-radius: 100%;
  overflow: hidden;
`;
