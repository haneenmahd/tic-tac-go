import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PlayerSide } from "../store/data";
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
import io from "socket.io-client";
import GameService from "../network/GameService";

const socket = io("ws://localhost:3001");

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
  const { roomId } = useParams();
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [side, setSide] = useState();

  useEffect(() => {
    GameService.shared.joinRoom(roomId, (side) => setSide(side));

    GameService.shared.ws.on("mark", (squares) => {
      setSquares(squares);
    });

    GameService.shared.markMove(roomId, 0, null, (squares) => {
      setSquares(squares);
    });
  }, []);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    GameService.shared.markMove(roomId, i, side, (squares) => {
      setSquares(squares);
    });
  };

  return (
    <FlexDiv direction="column">
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
      </FlexDiv>

      <Toaster />
    </FlexDiv>
  );
};

export default Game;

// freeze the ability to mark a move when you have already made one

{
  /* <FlexDiv direction="row">
        <FlexDiv direction="row" gap="20px">
          <PlayerInfo>
            <img
              height={12}
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
              height={12}
              src={side !== PlayerSide.X ? SymbolX : SymbolO}
              alt="Symbol for You"
            />
            <PlayerName active={currentSide !== side}>Opponent</PlayerName>
          </PlayerInfo>
        </FlexDiv>
      </FlexDiv> */
}
