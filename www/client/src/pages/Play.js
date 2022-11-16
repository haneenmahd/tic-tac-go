import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import {
  ClippedAndRounded,
  COLORS,
  Divider,
  FlexDiv,
  PadBox,
  TRANSITIONS,
} from "../styling";
import { LinkLessNav } from "../components/NavBar";
import Avatar from "boring-avatars";
import generateId from "../utils/generateId";
import Button from "../components/Button";
import ArrowUp from "../assets/svg/icons/arrow-up.svg";
import TextField from "../components/TextField";
import OSymbol from "../assets/svg/moves/O.svg";
import XSymbol from "../assets/svg/moves/X.svg";
import SearchIcon from "../assets/svg/icons/search-filled.svg";
import GameService from "../network/GameService";
import { Check } from "react-feather";

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

const Container = styled.div`
  min-height: calc(100vh - 90px - 96px);
  width: 100%;
  display: flex;
  flex-direction: ${p => p.direction || "column"};
  align-items: center;
  justify-content: center;
  animation: ${FadeIn} 1s ${TRANSITIONS.load};
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
  width: 338px;
  height: 126px;
  border: 1px solid #ececec;
  border-radius: 100px;
`;

const PlayerInfoName = styled.p`
  font-weight: 500;
  text-wrap: wrap;
`;

const SearchPlayerInfoBubble = styled(PlayerInfoBubble)`
  cursor: pointer;
  transition: ${TRANSITIONS.focus};

  &:active {
    scale: 0.99;
  }
`;

const PlayerSidePreview = styled.img`
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

const PreviewAvatar = ({ id, avatar, avatarProps }) => (
  <SelectedAvatar key={id}>
    <Avatar
      size={225}
      name={avatar}
      {...avatarProps}
    />
  </SelectedAvatar>
);

const Play = () => {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(generateId());
  const [showingGame, setShowingGame] = useState(false);
  const [playerSide, setPlayerSide] = useState("X");
  const [joinedWaitingList, setJoinedWaitingList] = useState(false);
  const [opponent, setOpponent] = useState();

  const playerSides = {
    X: "X",
    O: "O",
  };

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

  const findPlayer = async () => {
    const player = await GameService.shared.findPlayer(name, playerSide);

    setOpponent(player);
  };

  const joinWaitingList = () => {
    GameService.shared.joinWaitingList(name, playerSide, selectedAvatar);

    setJoinedWaitingList(true);
  };

  const avatarPickerView = (
    <Container>
      <PreviewAvatar
        id={generateId()}
        avatar={selectedAvatar}
        avatarProps={avatarProps}
      />

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
      <PlayerInfoBubble>
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
          {joinedWaitingList ? (
            <PlayerSidePreview
              src={playerSide === playerSides.X ? XSymbol : OSymbol}
              selected
            />
          ) : (
            <>
              <PlayerSidePreview
                src={OSymbol}
                alt="O symbol"
                selected={playerSide === playerSides.O}
                onClick={() => setPlayerSide(playerSides.O)}
              />

              <PlayerSidePreview
                src={XSymbol}
                alt="X symbol"
                selected={playerSide === playerSides.X}
                onClick={() => setPlayerSide(playerSides.X)}
              />
            </>
          )}
        </FlexDiv>

        {joinedWaitingList || (
          <ConfirmButton onClick={joinWaitingList}>
            <Check />
          </ConfirmButton>
        )}
      </PlayerInfoBubble>

      <Divider fit />

      {opponent ? (
        <PlayerInfoBubble>
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

          <PlayerSidePreview
            src={opponent.side === playerSides.X ? XSymbol : OSymbol}
            selected
          />
        </PlayerInfoBubble>
      ) : (
        <SearchPlayerInfoBubble onClick={findPlayer}>
          <FlexDiv gap="20px">
            <img
              src={SearchIcon}
              alt="opponent search icon"
            />

            <span>Search for opponent</span>
          </FlexDiv>
        </SearchPlayerInfoBubble>
      )}
    </Container>
  );

  return (
    <FlexDiv
      direction="column"
      flexHeight>
      <LinkLessNav />

      {showingGame ? preMatchView : avatarPickerView}
    </FlexDiv>
  );
};

export default Play;
