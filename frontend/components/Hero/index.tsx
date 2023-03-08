import styled from "styled-components";
import Button from "../Button";
import { QUERIES } from "../constants";
import HeroContent from "./HeroContent";
import Link from "next/link";
import HeroImageSrc from "assets/png/game-mobile.png";
import { ChevronRight } from "react-feather";
import Image from "next/image";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  gap: 30px;
  min-height: calc(100vh - 90px - 96px);

  @media screen and (${QUERIES.small}) {
    min-height: 100%;
  }
`;

const HeroSubContainer = styled.div`
  display: flex;
  max-width: 40%;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (${QUERIES.small}) {
    max-width: 100%;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 20px;
  padding: 30px 0;

  @media screen and (${QUERIES.small}) {
    width: 100%;

    button {
      width: 100%;
      gap: 1.5rem;
    }
  }
`;

const CTAButton = styled(Button)`
  position: relative;

  @media screen and (${QUERIES.small}) {
    &::before {
    content: "";
    position: absolute;
    top: 0.5rem;
    height: 100px;
    width: 300px;
    background: repeating-radial-gradient(#000 -20.22%, #0C8F8F 76.38%, #000 93.28%);
    filter: blur(50px);
    z-index: -1;
  }
  }
`;

const HeroImage = styled(Image)`
  max-width: 350px;
  height: auto;

  @media screen and (${QUERIES.small}) {
   display: none;
  }
`;

export default function Hero() {
  return (
    <Wrapper>
      <HeroSubContainer>
        <HeroContent />

        <HeroActions>
          <Link href="/play" aria-label="Link to Game page.">
            <CTAButton noScaling>
              <ChevronRight size={18} />

              Play
            </CTAButton>
          </Link>
        </HeroActions>
      </HeroSubContainer>

      <HeroImage
        src={HeroImageSrc}
        alt="2 players in a multiplayer tic tac toe game with Bob with a score of 1 and Hetty with 3."
      />
    </Wrapper>
  )
};
