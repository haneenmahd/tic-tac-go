import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { COLORS, QUERIES } from "../styling";
import GameService from "../network/GameService";
import OSymbol from "../assets/svg/symbols/O.svg";
import XSymbol from "../assets/svg/symbols/X.svg";

export const symbols = {
  X: "X",
  O: "O",
};

const BOARD_RESOLUTION = "469px"; // 469x469

const Board = styled.div`
  position: relative;
  width: 469px;
  height: 469px;
  background: #f9f9f9;
  border-radius: 58px;
  margin: 60px 0;
  overflow: hidden;

  @media screen and (${QUERIES.small}) {
    width: 300px;
    height: 300px;
  }
`;

const BoardForeground = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  grid-template-columns: repeat(3, calc(${BOARD_RESOLUTION} / 3));
  place-items: center;
  display: grid;
  justify-items: center;
  z-index: 2;

  @media screen and (${QUERIES.small}) {
    grid-template-columns: repeat(3, calc(300px / 3));
  }
`;

const BoardBackground = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroudHorizontalContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 150px;

  @media screen and (${QUERIES.small}) {
    gap: 100px;
  }
`;

const BackgroudVerticalContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 150px;

  @media screen and (${QUERIES.small}) {
    gap: 100px;
  }
`;

const BoardSeperator = styled.div`
  background: ${COLORS.lightGray};
  border-radius: 30px;

  ${p => p.horizontal ? css`
    height: 3px;
    width: 90%;
  ` : css`
    height: 90%;
    width: 3px;
  `}
`;

const Row = styled.div`
  width: calc(${BOARD_RESOLUTION} / 3);
  height: calc(${BOARD_RESOLUTION});

  @media screen and (${QUERIES.small}) {
    width: calc(300px / 3);
    height: 300px;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(${BOARD_RESOLUTION} / 3);
  width: calc(${BOARD_RESOLUTION} / 3);

  @media screen and (${QUERIES.small}) {
    width: 100px;
    height: 100px;
  }
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

  @media screen and (${QUERIES.small}) {
    width: 60px;
    height: 60px;
  }
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
  }, [playerScore, setRoundOver]);

  return (
    <Board>
      <BoardForeground>
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
      </BoardForeground>

      <BoardBackground>
        <BackgroudHorizontalContainer>
          <BoardSeperator horizontal />

          <BoardSeperator horizontal />
        </BackgroudHorizontalContainer>

        <BackgroudVerticalContainer>
          <BoardSeperator />

          <BoardSeperator />
        </BackgroudVerticalContainer>
      </BoardBackground>
    </Board>
  );
};

export default Game;
