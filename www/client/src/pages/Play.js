import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { COLORS, FlexDiv, PadBox, TRANSITIONS } from "../styling";
import { LinkLessNav } from "../components/NavBar";
import Avatar from "boring-avatars";
import generateId from "../utils/generateId";
import Button from "../components/Button";
import ArrowUp from "../assets/svg/icons/arrow-up.svg";
import TextField from "../components/TextField";

const Container = styled.div`
  height: calc(100vh - 90px - 96px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

  svg rect {
    animation: ${SelectedAvatarAnimation} 1s ${TRANSITIONS.load};
  }

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
    `}
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

  return (
    <FlexDiv
      direction="column"
      flexHeight>
      <LinkLessNav />

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
            />

            <Button>
              <img
                src={ArrowUp}
                alt="plus icon"
              />
              Update
            </Button>
          </FlexDiv>
        </PadBox>

        {/* AVATAR PICKER GRID */}
        <AvatarPickerGrid>
          {avatars.map((avatar, id) => (
            <AvatarOption
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
    </FlexDiv>
  );
};

export default Play;
