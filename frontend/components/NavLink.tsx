import styled from "styled-components";
import Link from "next/link";
import { TRANSITIONS, COLORS } from "./constants";

const NavLink = styled(Link)`
  font-size: 16px;
  padding: 5px;
  border-radius: 5px;
  color: ${COLORS.black};
  transition: ${TRANSITIONS.hovers};

  &:hover {
    background-color: ${COLORS.hoverBackground};
  }
`;

export default NavLink;
