import { useState } from "react";
import styled from "styled-components";
import GameService from "../network/GameService";

const Board = styled.div`
  place-items: center;
  display: grid;
  justify-items: center;
  grid-template-columns: calc(469px / 3) calc(469px / 3) calc(469px / 3);
  width: 469px;
  height: 469px;
  background: #f9f9f9;
  border-radius: 58px;
  margin: 60px 0;
`;

const Square = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Game = ({
  setPlayerScore,
  setOpponentScore,
  playerSide,
  opponentSide,
}) => {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const handleClick = i => {
    if (GameService.shared.calculateWinner(squares) || squares[i]) {
      return;
    }

    GameService.shared.markMove(i, "I WILL WIN", squares =>
      setSquares(squares)
    );
  };

  return (
    <Board>
      {squares.map((square, i) => (
        <Square
          onClick={() => handleClick(i)}
          key={i}>
          {square}
        </Square>
      ))}
    </Board>
  );
};

export default Game;
