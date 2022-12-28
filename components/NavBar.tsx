import styled from "styled-components";
import NavLink from "./NavLink";
import Divider from "./Divider";
import { COLORS } from "./constants";
import Icon from "assets/svg/logo.svg";
import Image from "next/image";

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 33px 30px;
  width: 100vw;
  height: 90px;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const LinkLessNavContainer = styled(Container)`
  align-items: center;
  gap: 56px;

  /* Modifying the link style to be consistently padded */
  a {
    padding: 5px 15px;
  }
`;

const Text = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: ${COLORS.black};
`;

const HomeLink = () => (
  <NavLink href="/">
    <LogoContainer>
      <Image
        src={Icon}
        alt="Icon for TicTacGo"
      />
      <Text>TicTacGo</Text>
    </LogoContainer>
  </NavLink>
);

const NavBar = () => {
  return (
    <Container>
      <HomeLink />

      <NavLink href="/play">Play</NavLink>
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
