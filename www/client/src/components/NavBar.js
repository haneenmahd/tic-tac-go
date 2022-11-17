import styled from "styled-components";
import NavLink from "./NavLink";
import Divider from "./Divider";
import { COLORS, FlexDiv } from "../styling";
import Icon from "../assets/svg/logo.svg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 33px 30px;
  width: 100vw;
  height: 90px;
`;

const LinkLessNavContainer = styled(Container)`
  align-items: center;
  gap: 56px;
`;

const Text = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: ${COLORS.black};
`;

const HomeLink = () => (
  <NavLink to="/">
    <FlexDiv gap="11px">
      <img
        src={Icon}
        alt="Icon for TicTacGo"
      />
      <Text>TicTacGo</Text>
    </FlexDiv>
  </NavLink>
);

const NavBar = () => {
  return (
    <Container>
      <HomeLink />

      <NavLink to="/play">Play</NavLink>
    </Container>
  );
};

const LinkLessNav = () => (
  <LinkLessNavContainer>
    <HomeLink />

    <Divider maxWidth />
  </LinkLessNavContainer>
);

export { LinkLessNav };
export default NavBar;
