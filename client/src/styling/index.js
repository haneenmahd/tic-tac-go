import styled from "styled-components";

export const QUERIES = {
  large: "min-width: 801px",
};

export const COLORS = {
  black: "#000",
  hoverTextBlack: "#00000050",
  gray: "#8B8B8B",
  fadedGray: "#ececec",
  lightGray: "#dfdfdf",
  white: "#fff",
  hoverBackground: "#00000010",
};

export const TRANSITIONS = {
  hovers: "150ms cubic-bezier(0.72, 0.04, 0.04, 1.01)",
  focus: "200ms cubic-bezier(0.72, 0.04, 0.04, 1.01)",
  load: "cubic-bezier(0.69, -0.03, 0.2, 1)",
};

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || "row"};
  align-items: ${props => props.alignment || "center"};
  justify-content: ${props => props.justify || "center"};
  gap: ${props => props.gap};
`;

export const Divider = styled.div`
  width: 405px;
  height: 0px;
  border: 1px solid ${COLORS.fadedGray};
`;

export const PadBox = styled.div`
  padding: ${props => props.padding};
`;
