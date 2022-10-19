import styled from "styled-components";
import { COLORS, FlexDiv, TRANSITIONS } from "../styling";
import Icon from "../assets/svg/icon.svg";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 33px 30px;
  width: 100vw;
  height: 90px;
`;

const Text = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: ${COLORS.black};
`;

const NavLink = styled(Link)`
  font-size: 16px;
  padding: 5px;
  border-radius: 5px;
  transition: ${TRANSITIONS.hovers};

  &:hover {
    background-color: ${COLORS.hoverBackground};
  }
`;

export default function NavBar() {
  return (
    <Container>
      <FlexDiv gap="11px">
        <img src={Icon} alt="Icon for TicTacGo" />
        <Text>TicTacGo</Text>
      </FlexDiv>

      <NavLink to="/play">Play</NavLink>
    </Container>
  );
}
