import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Check } from "react-feather";
import {
  ClippedAndRounded,
  COLORS,
  FlexDiv,
  PadBox,
  TRANSITIONS,
} from "../styling";
import { LinkLessNav } from "../components/NavBar";
import Avatar from "boring-avatars";
import generateId from "../utils/generateId";
import Button from "../components/Button";
import Divider from "../components/Divider";
import ArrowUp from "../assets/svg/icons/arrow-up.svg";
import ArrowRight from "../assets/svg/icons/arrow-right.svg";
import TextField from "../components/TextField";
import OSymbol from "../assets/svg/symbols/O.svg";
import XSymbol from "../assets/svg/symbols/X.svg";
import SearchIcon from "../assets/svg/icons/search-filled.svg";
import GameService from "../network/GameService";
import Game, { symbols } from "../components/Game";

const PageContainer = styled(FlexDiv)`
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
    height: 0;
    width: 0;
  }
`;

const SelectedAvatar = styled.div`
  position: relative;
  cursor: pointer;

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
`;

const AvatarPickerGrid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 44px;
  padding: 10px 0;
  justify-content: center;
  grid-template-columns: repeat(6, 100px);

  @media screen and (max-width: 48rem) {
    width: 80%;
    grid-template-columns: repeat(3, 100px);
    grid-gap: 22px;
  }
`;

const AvatarOption = styled.div`
  cursor: pointer;
  filter: drop-shadow(0 0 0);
  transition: ${TRANSITIONS.hovers};

  svg {
    stroke: transparent;
    stroke-dasharray: 5;
    stroke-dashoffset: 5;
    stroke-linecap: round;
    transition: ${TRANSITIONS.focus};
  }

  &:hover {
    scale: 1.05;
  }

  &:active {
    scale: 0.99;
  }

  ${p =>
    p.selected &&
    css`
      svg {
        stroke-dasharray: 0;
        stroke-dashoffset: 0;
        stroke: black;
      }

      svg rect,
      svg path {
        animation: ${SelectedAvatarAnimation} 1s ${TRANSITIONS.load};
      }
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

const GameActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 29px;
`;

const GameActionButton = styled(Button)`
  font-weight: 500;
  padding: 0 20px;
  color: ${COLORS.black};
  background: ${COLORS.blue};

  &:hover {
    background: ${COLORS.secondaryHoverBackground};
  }
`;

const GameActionButtonSecondary = styled(GameActionButton)`
  font-weight: normal;
  border: 1px solid ${COLORS.blue};
  background: ${COLORS.fadedBlue};

  &:hover {
    background: ${COLORS.blue}90;
  }
`;

const Play = () => {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(generateId());
  const [showingGame, setShowingGame] = useState(false);
  const [symbol, setSymbol] = useState("X");
  const [joinedGame, setJoinedGame] = useState(false);
  const [opponent, setOpponent] = useState(null);

  const [round, setRound] = useState(1);
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  const [avatars] = useState(
    Array(12)
      .fill(null)
      .map(() => generateId())
  );

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

  const avatarPickerView = (
    <Container>
      <SelectedAvatar key={generateId()}>
        <Avatar
          size={225}
          name={selectedAvatar}
          {...avatarProps}
        />
      </SelectedAvatar>

      <PadBox padding="50px 0">
        <FlexDiv
          direction="row"
          gap="20px">
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
        </FlexDiv>
      </PadBox>

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

  const preMatchView = (
    <Container
      direction="row"
      gap="36px"
      key={null}>
      <GameInfoContainer>
        <PlayerInfoBubble isPlayerTurn={isPlayerTurn}>
          <FlexDiv gap="20px">
            <ClippedAndRounded>
              <Avatar
                size={80}
                name={selectedAvatar}
                {...avatarProps}
              />
            </ClippedAndRounded>

            <PlayerInfoName>{name}</PlayerInfoName>
          </FlexDiv>

          <FlexDiv gap="10px">
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
          </FlexDiv>

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
            <FlexDiv gap="20px">
              <ClippedAndRounded>
                <Avatar
                  size={80}
                  name={opponent.avatarId}
                  {...avatarProps}
                />
              </ClippedAndRounded>

              <PlayerInfoName>{opponent.name}</PlayerInfoName>
            </FlexDiv>

            <SymbolPreview
              src={opponent.symbol === symbols.X ? XSymbol : OSymbol}
              selected
            />
          </PlayerInfoBubble>
        ) : (
          <SearchPlayerInfoBubble searching={joinedGame}>
            <FlexDiv gap="20px">
              <img
                src={SearchIcon}
                alt="opponent searching icon"
              />

              <span>
                {joinedGame ? "Searching for opponent" : "Choose your side"}
              </span>
            </FlexDiv>
          </SearchPlayerInfoBubble>
        )}
      </GameInfoContainer>

      {opponent ? (
        <>
          <Game
            symbol={symbol}
            setRound={setRound}
            playerScore={playerScore}
            setPlayerScore={setPlayerScore}
            setOpponentScore={setOpponentScore}
            isPlayerTurn={isPlayerTurn}
            setPlayerTurn={setPlayerTurn}
          />

          <GameActions>
            <GameActionButton onClick={() => setRound(round + 1)}>
              Next Round

              <img
                src={ArrowRight}
                alt="arrow up icon"
              />
            </GameActionButton>
            <GameActionButtonSecondary>Chat</GameActionButtonSecondary>
          </GameActions>
        </>
      ) : null}
    </Container>
  );

  return (
    <PageContainer
      direction="column"
      flexHeight>
      <GameContainer>
        {showingGame ? preMatchView : avatarPickerView}
      </GameContainer>

      <LinkLessNav />
    </PageContainer>
  );
};

export default Play;
