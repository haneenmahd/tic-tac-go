import { useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { PlayerSide, PlayModes } from "../store/data";
import { COLORS, FlexDiv, GameInfo, PlayerName } from "../styling";
import SymbolO from "../assets/svg/O-symbol.svg";
import SymbolX from "../assets/svg/X-symbol.svg";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        highlightedLines: lines[i],
        winner: squares[a],
      };
    }
  }

  return {
    highlightedLines: null,
    winner: null,
  };
}

const Board = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px;
  height: 300px;
  width: 300px;
  background-color: #fff;
  box-shadow: -2px 3px 10px 0 rgba(19, 14, 124, 0.15);
`;

const Square = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
  border: 1px solid ${COLORS.fadedBlue};
  cursor: pointer;
  transition: 200ms ease-in-out;

  &:hover {
    background: ${COLORS.fadedLightBlue};
  }
`;

const Game = (props) => {
  const params = useParams();
  const mode = params.mode;
  const side = params.side;
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentSide, setCurrentSide] = useState(side); // using the default chosen for the first move

  const handleClick = (i) => {
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }

    const tempSquares = squares.slice();
    tempSquares[i] = currentSide;

    setSquares(tempSquares);
    setCurrentSide(currentSide === PlayerSide.X ? PlayerSide.O : PlayerSide.X);
  };

  return (
    <FlexDiv direction="column">
      <FlexDiv direction="row">
        <PlayerName>You</PlayerName>

        <GameInfo>0 - 0</GameInfo>

        <PlayerName>{mode}</PlayerName>
      </FlexDiv>

      <Board>
        {squares.map((square, index) => {
          const img =
            square === PlayerSide.X ? (
              <img height={50} src={SymbolX} alt="Symbol for X" />
            ) : square === PlayerSide.O ? (
              <img height={50} src={SymbolO} alt="Symbol for O" />
            ) : null;

          return (
            <Square onClick={() => handleClick(index)} key={index}>
              {img}
            </Square>
          );
        })}
      </Board>
    </FlexDiv>
  );
};

export default Game;
