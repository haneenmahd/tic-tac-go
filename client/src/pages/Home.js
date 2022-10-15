import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  Button,
  COLORS,
  Divider,
  FlexDiv,
  GameInfo,
  HighlightedText,
  TextField,
} from "../styling";
import { PlayerSide, PlayModes } from "../store/data";
import SymbolO from "../assets/svg/O-symbol.svg";
import SymbolX from "../assets/svg/X-symbol.svg";

const SideImage = styled.img`
  height: 100px;
  opacity: 0.3;
  scale: 0.8;
  filter: grayscale(0.5);
  cursor: pointer;
  transition: 300ms ease-in-out;

  ${(props) =>
    props.selected &&
    css`
      opacity: 1;
      scale: 1;
      filter: grayscale(0);
    `}
`;

const Home = () => {
  return (
    <FlexDiv flexHeight>
      <div>
        <FlexDiv direction="row" gap="30px">
          <img height="100px" src={SymbolX} alt="X symbol" />
          <img height="100px" src={SymbolO} alt="O symbol" />
        </FlexDiv>

        <FlexDiv direction="column" gap="10px">
          <HighlightedText>Tic Tac Toe. Now with more fun!</HighlightedText>
          <h2>Choose your play mode</h2>

          <FlexDiv direction="column" gap="20px">
            <FlexDiv direction="row" gap="20px">
              <TextField placeholder="Room Code" />
              <Button>Join Room</Button>
            </FlexDiv>
            <Divider />
            <FlexDiv>
              <Button secondary>Create room</Button>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      </div>
    </FlexDiv>
  );
};

export default Home;
