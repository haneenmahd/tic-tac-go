import { useEffect, useState } from "react";
import styled from "styled-components";
import GameService from "../network/GameService";

const BOARD_RESOLUTION = "469px"; // 469x469

const Board = styled.div`
  grid-template-columns: repeat(3, calc(${BOARD_RESOLUTION} / 3));
  place-items: center;
  display: grid;
  justify-items: center;
  width: 469px;
  height: 469px;
  background: #f9f9f9;
  border-radius: 58px;
  margin: 60px 0;
`;

const Row = styled.div`
  width: calc(${BOARD_RESOLUTION} / 3);
  height: calc(${BOARD_RESOLUTION});
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(${BOARD_RESOLUTION} / 3);
  width: calc(${BOARD_RESOLUTION} / 3);
`;

const Game = ({
  symbol,
  opponentSymbol,
  playerScore,
  setPlayerScore,
  setOpponentScore,
  isPlayerTurn,
  setPlayerTurn,
}) => {
  const [matrix, setMatrix] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  GameService.shared.onUpdateGame(matrix => {
    setMatrix(matrix);
    setPlayerTurn(true);
  });

  GameService.shared.onUpdateScore(score => {
    setOpponentScore(score);
  });

  const updateGame = () => {
    GameService.shared.updateGame(matrix);
    setPlayerTurn(false);
  };

  const clearMatrix = () => {
    setMatrix([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  };

  GameService.shared.onClearGame(clearMatrix);

  const handleClick = (row, column) => {
    if (
      !isPlayerTurn ||
      GameService.shared.calculateWinner(matrix) ||
      matrix[row][column]
    ) {
      return;
    }

    const newMatrix = [...matrix];
    newMatrix[row][column] = symbol;

    setMatrix(newMatrix);
    updateGame();
  };

  useEffect(() => {
    if (GameService.shared.calculateWinner(matrix) === symbol) {
      setPlayerScore(score => score + 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matrix]);

  useEffect(() => {
    GameService.shared.updateScore(playerScore);
    GameService.shared.clearGame();
    clearMatrix();
  }, [playerScore]);

  return (
    <Board>
      {matrix.map((row, rowIdx) => (
        <Row key={rowIdx}>
          {row.map((column, colIdx) => (
            <Column
              onClick={() => handleClick(rowIdx, colIdx)}
              key={colIdx}>
              {column || "_"}
            </Column>
          ))}
        </Row>
      ))}
    </Board>
  );
};

export default Game;
