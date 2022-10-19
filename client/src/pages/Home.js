import { useState } from "react";
import styled, { css } from "styled-components";
import { FlexDiv } from "../styling";
import GameService from "../network/GameService";
import NavBar from "../components/NavBar";

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
