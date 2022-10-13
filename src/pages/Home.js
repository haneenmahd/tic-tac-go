import { useState } from "react";
import { Button, COLORS, FlexDiv, HighlightedText } from "../styling";
import SymbolO from "../assets/svg/O-symbol.svg";
import SymbolX from "../assets/svg/X-symbol.svg";
import { PlayerSide, PlayModes } from "../store/data";
import styled, { css } from "styled-components";

const GameInfo = styled.div`
  padding: 0.8rem 2rem;
  background: ${COLORS.fadedLightBlue};
  border: 1px solid ${COLORS.fadedBlue};
  border-radius: 30px;
`;

const SideImage = styled.img`
  opacity: 0.3;
  cursor: pointer;
  transition: 300ms ease-in-out;

  ${(props) =>
    props.selected &&
    css`
      opacity: 1;
    `}
`;

const Home = () => {
  const [playMode, setPlayMode] = useState(null);
  const [side, setSide] = useState("X"); // choosing X by default

  const handlePlayMode = (mode) => {
    if (mode === PlayModes.AI || mode === PlayModes.FRIEND) {
      setPlayMode(mode);
    }
  };

  const handlePlaySide = (side) => {
    if (side === PlayerSide.O || side === PlayerSide.X) {
      setSide(side);
    }
  };

  const playModeView = (
    <div>
      <FlexDiv direction="row" gap="30px">
        <img src={SymbolX} alt="X symbol" />
        <img src={SymbolO} alt="O symbol" />
      </FlexDiv>

      <FlexDiv direction="column">
        <h2
          style={{
            color: COLORS.textBlue,
          }}
        >
          Choose your play mode
        </h2>

        <FlexDiv direction="column" gap="20px">
          <Button onClick={() => handlePlayMode(PlayModes.AI)}>With AI</Button>
          <Button onClick={() => handlePlayMode(PlayModes.FRIEND)} secondary>
            With a friend
          </Button>
        </FlexDiv>
      </FlexDiv>
    </div>
  );

  const pickSideView = (
    <FlexDiv direction="column">
      <h2>Pick your side</h2>

      <FlexDiv direction="row" gap="50px">
        <SideImage
          src={SymbolX}
          alt="X symbol"
          selected={side === PlayerSide.X}
          onClick={() => handlePlaySide(PlayerSide.X)}
        />
        <SideImage
          src={SymbolO}
          alt="O symbol"
          selected={side === PlayerSide.O}
          onClick={() => handlePlaySide(PlayerSide.O)}
        />
      </FlexDiv>

      <GameInfo>
        Playing with <HighlightedText>{playMode}</HighlightedText>
      </GameInfo>

      <Button secondary>Continue</Button>
    </FlexDiv>
  );

  return <FlexDiv flexHeight>{playMode ? pickSideView : playModeView}</FlexDiv>;
};

export default Home;
