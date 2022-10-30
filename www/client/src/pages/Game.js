import styled from "styled-components";
import { useName } from "../context/UserContext";

const Game = () => {
  const name = useName();

  return <div>{name}</div>;
};

export default Game;
