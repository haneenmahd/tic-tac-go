import styled from "styled-components";
import NavLink from "./NavLink";
import Divider from "./Divider";
import { COLORS } from "./constants";
import Icon from "assets/svg/logo.svg";

const Wrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 33px 30px;
  width: 100vw;
  height: 90px;
`;

const LogoWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const LinkLessNavWrapper = styled(Wrapper)`
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
    <LogoWrapper>
      <Icon />

      <Text>TicTacGo</Text>
    </LogoWrapper>
  </NavLink>
);

const NavBar = () => {
  return (
    <Wrapper>
      <HomeLink />

      <NavLink href="/play">Play</NavLink>
    </Wrapper>
  );
};

const LinkLessNav = () => (
  <LinkLessNavWrapper>
    <HomeLink />

    <Divider maxWidth />
  </LinkLessNavWrapper>
);

export { LinkLessNav };
export default NavBar;
