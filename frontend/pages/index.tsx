import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import NavBar from "components/NavBar";
import Button from "components/Button";
import { ChevronRight } from "react-feather";
import { COLORS, QUERIES } from "components/constants";
import GameMobileShowcase from "static/png/game-mobile.png";

const Container = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (${QUERIES.small}) {
    height: calc(100vh - 90px);
    justify-content: space-between;
  }
`;

const Hero = styled.div`
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

const HeroTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeroTitle = styled.div`
  display: flex;
  flex-direction: row;
  
  @media screen and (${QUERIES.small}) {
    
  }
`;

const HeroText = styled.h1<{
  active?: boolean;
}>`
  color: ${p => p.active ? "transparent" : COLORS.black};
  font-size: 2.5rem;
  background: repeating-radial-gradient(#000 -20.22%, #0C8F8F 76.38%, rgba(0, 0, 0, 0) 93.28%);
  background-clip: text;
  font-weight: 800;
  transition: color 250ms ease-in;
`;

const HeroDescription = styled.p`
  font-size: 1rem;
  color: ${COLORS.gray};
  line-height: 1.8rem;
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

const HeroContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timeout = setInterval(() => {
      if (activeIndex >= 2) {
        setActiveIndex(0);
      } else {
        setActiveIndex(index => index + 1);
      }
    }, 1000);

    return () => clearInterval(timeout);
  });

  return (
    <HeroTextContainer>
      <HeroTitle>
        <HeroText active={activeIndex === 0}>Tic.</HeroText>
        <HeroText active={activeIndex === 1}>Tac.</HeroText>
        <HeroText active={activeIndex === 2}>Go.</HeroText>
      </HeroTitle>
      <HeroDescription>
        Play Tic Tac Toe with random people around the world. You will be paired to a random player and you both will playing the game simultaneously. You will have 5 rounds, the one with the greater score wins.
      </HeroDescription>
    </HeroTextContainer>
  );
}

export default function Home() {
  return (
    <>
      <Head>

        <title>Tic Tac Go</title>
      </Head>

      <Container>
        <NavBar />

        <Hero>
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
            src={GameMobileShowcase}
            alt="2 players in a multiplayer tic tac toe game with Bob with a score of 1 and Hetty with 3."
          />
        </Hero>
      </Container>
    </>
  );
};