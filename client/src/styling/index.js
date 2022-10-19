import styled, { css } from "styled-components";

export const QUERIES = {
  large: "min-width: 801px",
};

export const COLORS = {
  black: "#000",
  hoverTextBlack: "#00000050",
  gray: "#8B8B8B",
  hoverBackground: "#00000010",
};

export const TRANSITIONS = {
  hovers: "150ms cubic-bezier(0.72, 0.04, 0.04, 1.01)",
};

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  align-items: ${(props) => props.alignment || "center"};
  justify-content: ${(props) => props.justify || "center"};
  gap: ${(props) => props.gap};
`;

export const PlayerName = styled.p`
  font-weight: 500;
`;

export const Button = styled.div`
  padding: 1rem 2rem;
  color: white;
  background: radial-gradient(${COLORS.blue}, ${COLORS.lightBlue});
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 20px 0 ${COLORS.fadedBlue};

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}

  ${(props) =>
    props.secondary &&
    css`
      background: radial-gradient(
        ${COLORS.fadedBlue},
        ${COLORS.fadedLightBlue}
      );
      color: ${COLORS.blue};
      font-weight: 500;
    `}
`;

export const TextField = styled.input`
  padding: 1rem 1.5rem;
  font-size: 1rem;
  border: 1px solid ${COLORS.fadedBlue};
  outline: none;
  border-radius: 30px;
  font-weight: 600;
  box-shadow: 0 0 0 0 ${COLORS.fadedBlue};
  transition: 100ms ease-in-out;

  &:focus {
    box-shadow: 0 0 0 2px ${COLORS.fadedBlue};
  }
`;

export const HighlightedText = styled.b`
  margin: 0 0.2rem;
  color: transparent;
  background: linear-gradient(90deg, ${COLORS.blue}, ${COLORS.lightBlue} 120%);
  background-clip: text;
  -webkit-background-clip: text;
`;

export const GameInfo = styled.div`
  display: flex;
  justify-content: center;
  width: 10rem;
  padding: 0.8rem 1em;
  background: ${COLORS.fadedLightBlue};
  border: 1px solid ${COLORS.fadedBlue};
  border-radius: 30px;
`;

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
