import styled, { css } from "styled-components";

export const QUERIES = {
  large: "min-width: 801px",
};

export const COLORS = {
  blue: "#0f00bd",
  lightBlue: "#6fcbff",
  fadedBlue: "#0f00bd20",
  fadedLightBlue: "#6fcbff20",
  textBlue: "rgb(37, 28, 139)",
};

export const FlexDiv = styled.div`
  height: ${(props) => (props.flexHeight ? "100vh" : "auto")};
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  padding: 1rem 0;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.gap || "20px"};

  @media screen and (${QUERIES.large}) {
    flex-direction: ${(props) => props.direction || "row"};
    gap: ${(props) => props.gap || "50px"};
  }
`;

export const PlayerName = styled.p`
  font-weight: 500;
`;

export const Button = styled.div`
  padding: 1rem 3rem;
  color: white;
  background: radial-gradient(${COLORS.blue}, ${COLORS.lightBlue});
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 20px 0 ${COLORS.fadedBlue};
  transition: background-position 100ms ease-in-out;

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
