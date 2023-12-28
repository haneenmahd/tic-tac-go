import styled, { css, keyframes } from "styled-components";
import { COLORS, QUERIES, TRANSITIONS } from "components/constants";
import FadeIn from "animations/FadeIn";
import TextField from "components/TextField";
import Button from "components/Button";
import PlayerAvatar from "components/PlayerAvatar";
import { Dispatch, SetStateAction, useState } from "react";
import { ArrowUp } from "react-feather";
import { Callback, CallbackNoParams } from "types";

const Wrapper = styled.div`
  min-height: calc(100vh - 90px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${FadeIn} 1s ${TRANSITIONS.load};
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
    max-width: 50%;
    height: auto;
    margin: 0 1rem;
  }
`;


const Form = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 50px 0;

  @media screen and (${QUERIES.small}) {
    flex-direction: column;
    width: 95%;
  }
`;

const PickerGrid = styled.div`
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
    gap: 2rem;
  }
`;

const AvatarOption = styled.div<{
    selected?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
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

interface AvatarPickerProps {
    avatars: string[]
    name: string
    setName: Dispatch<SetStateAction<string>>
    selectedAvatar: string
    handlePlay: CallbackNoParams<void>
    handleAvatarPick: Callback<string, void>
}

export default function AvatarPicker({
    avatars,
    name,
    setName,
    selectedAvatar,
    handlePlay,
    handleAvatarPick
}: AvatarPickerProps) {

    return (
        <Wrapper>
            <SelectedAvatar key={selectedAvatar}>
                <PlayerAvatar name={selectedAvatar} />
            </SelectedAvatar>

            <Form>
                <TextField
                    placeholder="What's your name?"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    maxLength={10}
                />

                <Button onClick={handlePlay}>
                    <ArrowUp />
                    Play
                </Button>
            </Form>

            <PickerGrid>
                {avatars.map((avatar, id) => (
                    <AvatarOption
                        key={id}
                        selected={selectedAvatar === avatar}
                        onClick={() => handleAvatarPick(avatar)}>
                        <PlayerAvatar name={avatar} size={70} />
                    </AvatarOption>
                ))}
            </PickerGrid>
        </Wrapper>
    )
}