import { useState } from "react";
import styled from "styled-components";
import { COLORS, Divider, QUERIES } from "../styling";
import GameService from "../network/GameService";
import NavBar from "../components/NavBar";
import Button, { SecondaryButton } from "../components/Button";
import TextField from "../components/TextField";
import { ReactComponent as ArrowRight } from "../assets/svg/icons/arrow-right.svg";
import Plus from "../assets/svg/icons/plus.svg";
import GameMobileShowcase from "../assets/png/game-mobile.png";
import { useNavigate } from "react-router-dom";

const Container = styled.main`
  height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  gap: 30px;
  min-height: calc(100vh - 90px - 96px);
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
  gap: 10px;
`;

const HeroTitle = styled.h1`
  font-weight: 500;
  font-size: 30px;
  color: ${COLORS.black};
  line-height: 40px;
`;

const HeroDescription = styled.p`
  font-size: 18px;
  color: ${COLORS.gray};
  line-height: 30px;
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

const HeroImage = styled.img`
  max-width: 350px;
  height: auto;

  @media screen and (${QUERIES.small}) {
    display: none;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate('/play');
  };

  return (
    <Container>
      <NavBar />

      <Hero>
        <HeroSubContainer>
          <HeroTextContainer>
            <HeroTitle>
              Play Tic Tac Toe together online with more fun, live chat and
              private rooms.
            </HeroTitle>
            <HeroDescription>
              Create rooms so that you can hang out and spend time with your
              family. With Competition Mode, you are open to play with more than
              2 players.
            </HeroDescription>
          </HeroTextContainer>

          <HeroActions>
            <Button onClick={handlePlay}>
              <ArrowRight stroke="white" />

              Play
            </Button>
          </HeroActions>
        </HeroSubContainer>

        <HeroImage
          src={GameMobileShowcase}
          alt="2 players in a multiplayer tic tac toe game with Bob with a score of 1 and Hetty with 3."
        />
      </Hero>
    </Container>
  );
};

export default Home;
