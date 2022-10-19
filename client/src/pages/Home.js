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
import GameService from "../network/GameService";
import SymbolO from "../assets/svg/O-symbol.svg";
import SymbolX from "../assets/svg/X-symbol.svg";
import NavBar from "../components/NavBar";

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
  const [roomId, setRoomId] = useState("");

  const handleCreateRoom = async () => {
    const res = await GameService.shared.createNewRoom();

    setRoomId(res.id);
  };

  return (
    <FlexDiv flexHeight>
      <NavBar />
    </FlexDiv>
  );
};

export default Home;
