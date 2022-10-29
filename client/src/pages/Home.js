import { useState } from "react";
import styled from "styled-components";
import { COLORS, Divider, FlexDiv, PadBox } from "../styling";
import GameService from "../network/GameService";
import NavBar from "../components/NavBar";
import Button, { SecondaryButton } from "../components/Button";
import TextField from "../components/TextField";
import ArrowUp from "../assets/svg/icons/arrow-up.svg";
import Plus from "../assets/svg/icons/plus.svg";
import GameMobileShowcase from "../assets/png/game-mobile.png";

const Hero = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  gap: 30px;
  height: calc(100vh - 90px - 96px);
`;

const HeroSubContainer = styled(FlexDiv)`
  max-width: 40%;
  flex-direction: column;
  align-items: flex-start;
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

const HeroActions = styled(FlexDiv)`
  gap: 20px;
  padding: 30px 0;
`;

const HeroImage = styled.img`
  max-width: 350px;
  height: auto;
`;

const Home = () => {
  const [roomId, setRoomId] = useState("");

  const handleCreateRoom = async () => {
    const res = await GameService.shared.createNewRoom();

    setRoomId(res.id);
  };

  return (
    <FlexDiv direction="column" flexHeight>
      <NavBar />

      <Hero>
        <HeroSubContainer>
          <FlexDiv direction="column" gap="10px">
            <HeroTitle>
              Play Tic Tac Toe together online with more fun, live chat and
              private rooms.
            </HeroTitle>
            <HeroDescription>
              Create rooms so that you can hang out and spend time with your
              family. With Competition Mode, you are open to play with more than
              2 players.
            </HeroDescription>
          </FlexDiv>

          <HeroActions>
            <TextField
              value={roomId}
              onChange={e => setRoomId(e.target.value)}
              type="text"
              placeholder="Room ID"
            />
            <Button>
              <img src={ArrowUp} alt="arrow up icon" />
              Join
            </Button>
          </HeroActions>

          <Divider />

          <PadBox padding="20px 0">
            <SecondaryButton onClick={handleCreateRoom}>
              <img src={Plus} alt="plus icon" />
              Create your room
            </SecondaryButton>
          </PadBox>
        </HeroSubContainer>

        <HeroImage
          src={GameMobileShowcase}
          alt="2 players in a multiplayer tic tac toe game with Bob with a score of 1 and Hetty with 3."
        />
      </Hero>
    </FlexDiv>
  );
};

export default Home;
