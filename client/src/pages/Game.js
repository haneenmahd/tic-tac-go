import { useEffect, useInsertionEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { PlayerSide, PlayModes } from "../store/data";
import {
  Button,
  COLORS,
  FlexDiv,
  GameInfo,
  PlayerInfo,
  PlayerName,
} from "../styling";
import { Toaster, toast } from "react-hot-toast";
import { Droplet } from "react-feather";
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
      return squares[a];
    }
  }

  return null;
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
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [currentSide, setCurrentSide] = useState(side); // using the default chosen for the first move
  const [roundCompleted, setRoundCompleted] = useState(false);

  useEffect(() => {
    if (calculateWinner(squares)) {
      if (currentSide !== PlayerSide.X) {
        setScore((score) => score + 1);

        toast("You won!", {
          icon: <Droplet fill="blue" />,
        });
      } else {
        setOpponentScore((opponentScore) => opponentScore + 1);

        toast("Your opponent won!", {
          icon: <Droplet fill="orange" />,
        });
      }

      setRoundCompleted(true);
    }
  }, [squares, side, currentSide]);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const tempSquares = squares.slice();
    tempSquares[i] = currentSide;

    setSquares(tempSquares);
    setCurrentSide(currentSide === PlayerSide.X ? PlayerSide.O : PlayerSide.X);
  };

  const allFilled = (squares) => {
    return squares.every((square) => square !== null);
  };

  const disableRoundButton = () => {
    if (allFilled(squares) || roundCompleted) {
      return false;
    }

    return true;
  };

  const nextRound = () => {
    setSquares(Array(9).fill(null));
    setRoundCompleted(false);
  };

  return (
    <FlexDiv direction="column">
      <FlexDiv direction="row">
        <FlexDiv direction="row" gap="20px">
          <PlayerInfo>
            <img
              height={30}
              src={side === PlayerSide.X ? SymbolX : SymbolO}
              alt="Symbol for You"
            />
            <PlayerName active={currentSide === side}>You</PlayerName>
          </PlayerInfo>

          <GameInfo>
            {score} - {opponentScore}
          </GameInfo>

          <PlayerInfo>
            <img
              height={30}
              src={side !== PlayerSide.X ? SymbolX : SymbolO}
              alt="Symbol for You"
            />
            <PlayerName active={currentSide !== side}>{mode}</PlayerName>
          </PlayerInfo>
        </FlexDiv>
      </FlexDiv>

      <FlexDiv direction="column" gap="100px">
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

        <Button
          onClick={nextRound}
          disabled={disableRoundButton()}
          tabIndex={1}
        >
          Next Round
        </Button>
      </FlexDiv>

      <Toaster />
    </FlexDiv>
  );
};

export default Game;
