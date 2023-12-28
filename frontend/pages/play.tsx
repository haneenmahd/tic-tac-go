import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Check, ArrowRight } from "react-feather";
import {
  COLORS,
  TRANSITIONS,
  QUERIES,
  symbols,
} from "components/constants";
import { LinkLessNav } from "components/NavBar";
import Game from "components/Game";
import GameActions from "components/Game/GameActions";
import GameResult from "components/Game/GameResult";
import GameService from "services/GameService";
import Crypto from "services/Crypto";
import Divider from "components/Divider";
import OSymbol from "assets/svg/O.svg";
import XSymbol from "assets/svg/X.svg";
import Head from "next/head";
import FadeIn from "animations/FadeIn";
import PlayerAvatar from "components/PlayerAvatar";
import AvatarPicker from "components/Play/AvatarPicker";
import type { PlayerSymbol, Player } from "types";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  min-height: calc(100vh - 90px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${FadeIn} 1s ${TRANSITIONS.load};
`;

const GameWrapper = styled.div`
  margin: 1rem;
`;

const GameInfoWrapper = styled.div<{
  showingGame: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media screen and (${QUERIES.small}) {
    flex-direction: column;
    gap: 2rem;
  }

  ${(p) => p.showingGame && css`
    @media screen and (${QUERIES.small}) {
      flex-direction: row;
      gap: 0.8rem;
      height: 80px;
      margin: 1rem 0;
      margin-top: 2rem;
  `}
`;

const PlayerInfoBubble = styled.div < {
  isPlayerTurn?: boolean;
  gameOver?: boolean;
  showingGame?: boolean;
}>`
  min-height: 126px;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 28px 25px;
  border: 2px dashed #ececec;
  border-radius: 100px;
  box-shadow: 0 0 0 0 rgba(223, 235, 255, 0.32);
  transition: box-shadow 100ms ease-in-out;

  @media screen and (${QUERIES.small}) {
    flex-direction: column;
    max-width: 100%;
    padding: 3rem;
    gap: 2rem;
    border-radius: 3rem;
  }

  ${p => p.isPlayerTurn && css`
    border: 2px solid rgba(223, 235, 255, 1);
  `}

  ${p => p.gameOver === false && p.isPlayerTurn && css`
    border: 2px solid rgba(223, 235, 255, 1);
  `}

  ${p => p.showingGame && css`
    @media screen and (${QUERIES.small}) {
        padding: 0;
        gap: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        border: none;
        margin: 0 2rem;
        filter: brightness(80%) opacity(0.5);
        transition: all 200ms ease-in-out;

      p {
        display: none;
      }
    }
  `}

  ${p => p.showingGame ? p.isPlayerTurn && css`
    @media screen and (${QUERIES.small}) {
        filter: brightness(100%) opacity(1);
    }
  ` : null}
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 100%;

  @media screen and (${QUERIES.small}) {
    gap: 1rem;

    svg {
      height: 50px;
      width: 50px;
    }
  }

  svg {
    height: 80px;
    width: 80px;
  }
`;

const AvatarActions = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1rem;

  @media screen and (${QUERIES.small}) {
    gap: 2rem;
  }
`;

const SymbolPreviewWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const PlayerInfoName = styled.p`
  font-weight: 500;
`;

const SymbolPreview = styled.div`
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

const SymbolPicker = styled(SymbolPreview) <{
  selected?: boolean;
}>`
  transition: 200ms ${TRANSITIONS.load};
  
  ${p =>
    p.selected
      ? css`
          opacity: 1;
          scale: 1;
          cursor: default;
        `
      : css`
          opacity: 0.39;
          scale: 0.7;
        `}
`;

const ConfirmButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  padding: 10px;
  font-size: 0.8rem;
  color: ${COLORS.white};
  background: #00000090;
  border-radius: 100px;
  border: 2px dashed #000;
  transition: ${TRANSITIONS.hovers};

  &:hover {
    background: ${COLORS.black};
  }

  &:active {
    scale: 0.95;
  }
`;

const GameRoundWrapper = styled.div<{
  showingGame?: boolean;
}>`
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 35px;

  ${p => p.showingGame && css`
    @media screen and (${QUERIES.small}) {
      gap: 0.5rem;
      margin: 0 1rem;
    }
  `}
`;

const GameRound = styled.div`
  width: 63px;
  height: 21px;
  background: #dcf0f0;
  border-radius: 30px;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${FadeIn} 1s ${TRANSITIONS.load};
`;

const ScoreCard = styled.div<{
  showingGame?: boolean;
}>`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  ${p => p.showingGame && css`
    @media screen and (${QUERIES.small}) {
       width: auto;
    }
  `}
`;

export async function getServerSideProps() {
  return {
    props: {
      avatars: Array(12)
        .fill(null)
        .map(() => Crypto.uid()!)
    }
  }
}

interface PlayProps {
  avatars: string[]
}

export default function Play({ avatars }: PlayProps) {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(
    avatars[0]
  );
  const [showingGame, setShowingGame] = useState(false);
  const [symbol, setSymbol] = useState<PlayerSymbol>("X");
  const [joinedGame, setJoinedGame] = useState(false);
  const [opponent, setOpponent] = useState<Player | null>(null);

  const [round, setRound] = useState(1);
  const [roundOver, setRoundOver] = useState(false);
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const pageTitle = showingGame ? `${playerScore} - ${opponentScore}` :
    "Choose your Avatar";
  const maxRounds = 5;

  const handleAvatarPick = (avatarId: string) => {
    setSelectedAvatar(avatarId);
  };

  const handlePlay = () => {
    setShowingGame(true);
  };

  const joinGame = async () => {
    await GameService.shared.init();

    GameService.shared.joinGame(name, symbol, selectedAvatar, () =>
      setJoinedGame(true)
    );

    // requires init() to run, or else null exception error
    GameService.shared.onConnect(() => {
      GameService.shared.onRoomJoinRequest(opponent => {
        setOpponent(opponent);

        if (!opponent.starter) {
          setPlayerTurn(true);
        } else {
          setPlayerTurn(false);
        }
      });

      GameService.shared.onRoomJoinError(error => alert(error));
    });
  };

  const handleNextRound = () => {
    setRound(round => {
      if (round < maxRounds) {
        round++;

        GameService.shared.nextRound(round);
      } else if (round === maxRounds) {
        setGameOver(true);
      }

      return round;
    });

    setRoundOver(false);
  };

  useEffect(() => {
    if (gameOver) {
      GameService.shared.gameOver();
    }
  }, [gameOver]);

  const matchView = (
    <Wrapper>
      <GameInfoWrapper showingGame={opponent !== null}>
        <PlayerInfoBubble
          gameOver={gameOver}
          isPlayerTurn={isPlayerTurn}
          showingGame={opponent !== null}>
          <AvatarWrapper>
            <PlayerAvatar name={selectedAvatar} />

            <PlayerInfoName>{name}</PlayerInfoName>
          </AvatarWrapper>

          <AvatarActions>
            <SymbolPreviewWrapper>
              {joinedGame ? (
                <SymbolPreview>
                  {
                    symbol === symbols.X ?
                      <XSymbol /> :
                      <OSymbol />
                  }
                </SymbolPreview>
              ) : (
                <>
                  <SymbolPicker
                    selected={symbol === symbols.X}
                    onClick={() => setSymbol(symbols.X)}>
                    <XSymbol />
                  </SymbolPicker>
                  <SymbolPicker
                    selected={symbol === symbols.O}
                    onClick={() => setSymbol(symbols.O)}>
                    <OSymbol />
                  </SymbolPicker>
                </>
              )}
            </SymbolPreviewWrapper>

            {!joinedGame ? (
              <ConfirmButton onClick={joinGame}>
                <Check />
              </ConfirmButton>
            ) : null}
          </AvatarActions>
        </PlayerInfoBubble>

        <GameRoundWrapper showingGame={opponent !== null}>
          {opponent ?
            <GameRound>Round {round}</GameRound>
            : null}

          {/* Show a divider when in prematch */}

          {opponent ? (
            <ScoreCard showingGame={opponent !== null}>
              <span>{playerScore}</span>
              <Divider maxWidth />
              <span>{opponentScore}</span>
            </ScoreCard>
          ) : null}
        </GameRoundWrapper>

        {opponent ? (
          <PlayerInfoBubble
            isPlayerTurn={!isPlayerTurn}
            showingGame={opponent !== null}>
            <AvatarWrapper>
              <PlayerAvatar name={opponent.avatarId} />

              <PlayerInfoName>{opponent.name}</PlayerInfoName>
            </AvatarWrapper>

            <SymbolPreview>
              {
                opponent.symbol === symbols.X ?
                  <XSymbol /> :
                  <OSymbol />
              }
            </SymbolPreview>
          </PlayerInfoBubble>
        ) : null}
      </GameInfoWrapper>

      {opponent ? (
        <>
          <Game
            symbol={symbol}
            gameOver={gameOver}
            setGameOver={setGameOver}
            setRound={setRound}
            setRoundOver={setRoundOver}
            playerScore={playerScore}
            setPlayerScore={setPlayerScore}
            setOpponentScore={setOpponentScore}
            isPlayerTurn={isPlayerTurn}
            setPlayerTurn={setPlayerTurn}
          />

          <GameActions
            disabled={!roundOver}
            primaryTitle="Next Round"
            primaryAction={handleNextRound}
            primaryIcon={
              <ArrowRight stroke="black" />
            }
            noSecondary
          />
        </>
      ) : null}
    </Wrapper>
  );

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <PageWrapper>
        <GameWrapper>
          {showingGame && !gameOver ? matchView : null}
          {!showingGame && !gameOver ?
            <AvatarPicker
              avatars={avatars}
              name={name}
              setName={setName}
              selectedAvatar={selectedAvatar}
              handlePlay={handlePlay}
              handleAvatarPick={handleAvatarPick}
            /> : null}
          {showingGame && gameOver ?
            <GameResult
              playerName={name}
              playerAvatar={selectedAvatar}
              opponentName={opponent!.name}
              opponentAvatar={opponent!.avatarId}
              opponentScore={opponentScore}
              playerScore={playerScore}
            /> : null}
        </GameWrapper>

        <LinkLessNav />
      </PageWrapper>
    </>
  );
};
