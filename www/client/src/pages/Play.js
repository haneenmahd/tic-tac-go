import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Check } from "react-feather";
import {
  ClippedAndRounded,
  COLORS,
  TRANSITIONS,
  Divider,
  QUERIES
} from "../styling";
import { LinkLessNav } from "../components/NavBar";
import Avatar from "boring-avatars";
import generateId from "../utils/generateId";
import Button from "../components/Button";
import ArrowUp from "../assets/svg/icons/arrow-up.svg";
import { ReactComponent as ArrowRight } from "../assets/svg/icons/arrow-right.svg";
import TextField from "../components/TextField";
import OSymbol from "../assets/svg/symbols/O.svg";
import XSymbol from "../assets/svg/symbols/X.svg";
import SearchIcon from "../assets/svg/icons/search-filled.svg";
import GameService from "../network/GameService";
import Game, { symbols } from "../components/Game";
import GameActions from "../components/GameActions";
import GameResult from "../components/GameResult";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

const Container = styled.div`
  min-height: calc(100vh - 90px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${FadeIn} 1s ${TRANSITIONS.load};
`;

const GameContainer = styled.div`
  margin: 30px;
`;

const SelectedAvatarAnimation = keyframes`
  from {
    transform: translate(0%, -200%) skewY(100deg);
  }
`;

const SelectedAvatar = styled.div`
  position: relative;
  cursor: pointer;
  animation: ${SelectedAvatarAnimation} .5s ${TRANSITIONS.smoothHovers};

  &::before {
    content: "Good luck <3";
    position: absolute;
    opacity: 0;
    top: -5px;
    left: 50%;
    width: 130px;
    text-align: center;
    transform: translate(-50%, -50%);
    background-color: ${COLORS.gray};
    color: ${COLORS.white};
    padding: 5px 10px;
    border-radius: 5rem;
    transition: ${TRANSITIONS.hovers};
  }

  &:hover::before {
    opacity: 1;
    top: 0;
  }

  @media screen and (${QUERIES.small}) {
    max-width: 100%;
    height: auto;
    margin: 0 1rem;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 50px 0;
`;

const AvatarPickerGrid = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 44px;
  padding: 10px 0;
  justify-content: center;
  transition: all 300ms;

  @media screen and (${QUERIES.medium}) {
    width: 80%;
  }

  @media screen and (${QUERIES.small}) {
    width: 100%;
    gap: 22px;
  }
`;

const AvatarOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 100px;
  cursor: pointer;
  box-shadow: 0 0 0 0px ${COLORS.fadedGray};
  transition: transform .5s ${TRANSITIONS.smoothHovers}, 
              box-shadow .5s ${TRANSITIONS.smoothHovers};

  &:hover {
    transform: rotate3d(-1, 1, 1, 20deg) scale(1.2);
    transition: ${TRANSITIONS.hovers};
  }

  &:active {
    scale: 0.99;
  }

  ${p => p.selected && css`
    box-shadow: 0 0 0 5px ${COLORS.black};
  `}
`;

const PlayerInfoBubble = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 28px 25px;
  gap: 20px;
  min-width: 338px;
  height: 126px;
  border: 2px dashed #ececec;
  border-radius: 100px;
  box-shadow: 0 0 0 0 rgba(223, 235, 255, 0.32);
  transition: box-shadow 100ms ease-in-out;

  ${p => p.isPlayerTurn && css`
    border: 2px solid rgba(223, 235, 255, 1);
  `}

  ${p => p.gameOver === false && p.isPlayerTurn && css`
      border: 2px solid rgba(223, 235, 255, 1);
  `}
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SymbolPreviewContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const PlayerInfoName = styled.p`
  font-weight: 500;
`;

const BlinkAnimation = keyframes`
  0% {
    border-color: ${COLORS.black};
  }

  50% {
    border-color: ${COLORS.fadedGray};
  }

  100% {
    border-color: ${COLORS.black};
  }
`;

const SearchPlayerInfoBubble = styled(PlayerInfoBubble)`
  ${p =>
    p.searching &&
    css`
      border: 2px dashed ${COLORS.black};
      animation: ${BlinkAnimation} 1s ${TRANSITIONS.load} infinite;
    `}
`;

const SymbolPreview = styled.img`
  height: 30px;
  width: 30px;
  cursor: pointer;
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

const GameInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const GameRoundContainer = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 35px;
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

const ScoreCard = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
`;

const Play = () => {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(generateId());
  const [showingGame, setShowingGame] = useState(false);
  const [symbol, setSymbol] = useState("X");
  const [joinedGame, setJoinedGame] = useState(false);
  const [opponent, setOpponent] = useState(null);

  const [round, setRound] = useState(1);
  const [roundOver, setRoundOver] = useState(false);
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [avatars] = useState(
    Array(12)
      .fill(null)
      .map(() => generateId())
  );

  const maxRounds = 5;
  const avatarProps = {
    variant: "beam", // support more variants
    colors: ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"],
  };

  const handleAvatarPick = avatar => {
    setSelectedAvatar(avatar);
  };

  const handlePlay = () => {
    setShowingGame(true);
  };

  const joinGame = () => {
    GameService.shared.init();

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

  const avatarPickerView = (
    <Container>
      <SelectedAvatar key={selectedAvatar}>
        <Avatar
          size="100%"
          name={selectedAvatar}
          {...avatarProps}
        />
      </SelectedAvatar>

      <Form>
        <TextField
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={10}
        />

        <Button onClick={handlePlay}>
          <img
            src={ArrowUp}
            alt="plus icon"
          />
          Play
        </Button>
      </Form>

      <AvatarPickerGrid>
        {avatars.map((avatar, id) => (
          <AvatarOption
            key={id}
            selected={selectedAvatar === avatar}
            onClick={() => handleAvatarPick(avatar)}>
            <Avatar
              size={80}
              name={avatar}
              {...avatarProps}
            />
          </AvatarOption>
        ))}
      </AvatarPickerGrid>
    </Container>
  );

  const matchView = (
    <Container
      direction="row"
      gap="36px"
      key={null}>
      <GameInfoContainer>
        <PlayerInfoBubble
          gameOver={gameOver}
          isPlayerTurn={isPlayerTurn}>
          <AvatarContainer>
            <ClippedAndRounded>
              <Avatar
                size={80}
                name={selectedAvatar}
                {...avatarProps}
              />
            </ClippedAndRounded>

            <PlayerInfoName>{name}</PlayerInfoName>
          </AvatarContainer>

          <SymbolPreviewContainer>
            {joinedGame ? (
              <SymbolPreview
                src={symbol === symbols.X ? XSymbol : OSymbol}
                selected
              />
            ) : (
              <>
                <SymbolPreview
                  src={OSymbol}
                  alt="O symbol"
                  selected={symbol === symbols.O}
                  onClick={() => setSymbol(symbols.O)}
                />

                <SymbolPreview
                  src={XSymbol}
                  alt="X symbol"
                  selected={symbol === symbols.X}
                  onClick={() => setSymbol(symbols.X)}
                />
              </>
            )}
          </SymbolPreviewContainer>

          {!joinedGame ? (
            <ConfirmButton onClick={joinGame}>
              <Check />
            </ConfirmButton>
          ) : null}
        </PlayerInfoBubble>

        <GameRoundContainer>
          {opponent ?
            <GameRound>Round {round}</GameRound>
            : null}

          {/* Show a divider when in prematch */}
          {!opponent ? <Divider maxWidth /> : null}

          {opponent ? (
            <ScoreCard>
              <span>{playerScore}</span>
              <Divider maxWidth />
              <span>{opponentScore}</span>
            </ScoreCard>
          ) : null}
        </GameRoundContainer>

        {opponent ? (
          <PlayerInfoBubble isPlayerTurn={!isPlayerTurn}>
            <AvatarContainer>
              <ClippedAndRounded>
                <Avatar
                  size={80}
                  name={opponent.avatarId}
                  {...avatarProps}
                />
              </ClippedAndRounded>

              <PlayerInfoName>{opponent.name}</PlayerInfoName>
            </AvatarContainer>

            <SymbolPreview
              src={opponent.symbol === symbols.X ? XSymbol : OSymbol}
              selected
            />
          </PlayerInfoBubble>
        ) : (
          <SearchPlayerInfoBubble searching={joinedGame}>
            <AvatarContainer>
              <img
                src={SearchIcon}
                alt="opponent searching icon"
              />

              <span>
                {joinedGame ? "Searching for opponent" : "Choose your side"}
              </span>
            </AvatarContainer>
          </SearchPlayerInfoBubble>
        )}
      </GameInfoContainer>

      {opponent ? (
        <>
          <Game
            symbol={symbol}
            gameOver={gameOver}
            setGameOver={setGameOver}
            setRound={setRound}
            roundOver={roundOver}
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
            secondaryTitle="Chat"
          />
        </>
      ) : null}
    </Container>
  );

  return (
    <PageContainer
      direction="column"
      flexHeight>
      <GameContainer>
        {showingGame && !gameOver ? matchView : null}
        {!showingGame && !gameOver ? avatarPickerView : null}
        {showingGame && gameOver ? <GameResult
          avatarProps={avatarProps}
          playerName={name}
          playerAvatar={selectedAvatar}
          opponentName={opponent.name}
          opponentAvatar={opponent.avatarId}
          opponentScore={opponentScore}
          playerScore={playerScore}
        /> : null}
      </GameContainer>

      <LinkLessNav />
    </PageContainer>
  );
};

export default Play;
