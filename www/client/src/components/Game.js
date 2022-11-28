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
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Game = ({ symbol, opponentSymbol, setPlayerScore, setOpponentScore }) => {
  const [matrix, setMatrix] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]); // update the way to render (row, columns)

  GameService.shared.onUpdateGame(matrix => setMatrix(matrix));

  const updateGame = () => {
    GameService.shared.updateGame(matrix);
  };

  const handleClick = (row, column) => {
    if (GameService.shared.calculateWinner(matrix) || matrix[row][column]) {
      return;
    }

    const newMatrix = [...matrix];

    newMatrix[row][column] = symbol;

    setMatrix(newMatrix);

    updateGame();
  };

  return (
    <Board>
      {matrix.map((row, rowIdx) => (
        <div key={rowIdx}>
          {row.map((column, colIdx) => (
            <Square
              onClick={() => handleClick(rowIdx, colIdx)}
              key={colIdx}>
              {column || "_"}
            </Square>
          ))}
        </div>
      ))}
    </Board>
  );
};

export default Game;
