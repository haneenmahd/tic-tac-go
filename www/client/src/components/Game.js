import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import GameService from "../network/GameService";
import OSymbol from "../assets/svg/symbols/O.svg";
import XSymbol from "../assets/svg/symbols/X.svg";

export const symbols = {
  X: "X",
  O: "O",
};

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

const SymbolAniamtion = keyframes`
  from {
    scale: 0;
  }

  to {
    scale: 1;
  }
`;

const SymbolPreview = styled.img`
  height: 100px;
  width: 100px;
  user-select: none;
  animation: ${SymbolAniamtion} 250ms cubic-bezier(0.25, 0.15, 0, 1.13);
`;

const Game = ({
  symbol,
  gameOver,
  setGameOver,
  setRound,
  setRoundOver,
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
  GameService.shared.onNextRound(round => {
    setRoundOver(false);
    setRound(round);

    GameService.shared.clearGame();
    clearMatrix();
  });
  GameService.shared.onGameOver(() => setGameOver(true));

  const handleClick = (row, column) => {
    if (
      !isPlayerTurn ||
      gameOver ||
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

    if (
      matrix.every(row => row.every(col => col !== null))
      &&
      GameService.shared.calculateWinner(matrix) === null
    ) {
      setRoundOver(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matrix]);

  useEffect(() => {
    GameService.shared.updateScore(playerScore);
    setRoundOver(isOver => isOver ? false : true);
  }, [playerScore]);
  // useCallback() for preventing mutliple renders and improving performances

  return (
    <Board>
      {matrix.map((row, rowIdx) => (
        <Row key={rowIdx}>
          {row.map((column, colIdx) => (
            <Column
              onClick={() => handleClick(rowIdx, colIdx)}
              key={colIdx}>
              {column === symbols.X ?
                <SymbolPreview src={XSymbol} alt="X Symbol" />
                : column === symbols.O ?
                  <SymbolPreview src={OSymbol} alt="O Symbol" />
                  : null}
            </Column>
          ))}
        </Row>
      ))}
    </Board>
  );
};

export default Game;
