import styled from "styled-components";
import { Link } from "react-router-dom";
import { TRANSITIONS, COLORS } from "../styling";

const NavLink = styled(Link)`
  font-size: 16px;
  padding: 5px;
  border-radius: 5px;
  transition: ${TRANSITIONS.hovers};

  &:hover {
    background-color: ${COLORS.hoverBackground};
  }
`;

export default NavLink;
