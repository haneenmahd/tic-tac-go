import styled from "styled-components";
import { COLORS, TRANSITIONS } from "./constants";

const TextField = styled.input`
  width: 100%;
  height: 45px;
  font-size: 15px;
  background: #ffffff;
  border: 1px solid ${COLORS.lightGray};
  border-radius: 30px;
  padding: 14px;
  padding-left: 24px;
  outline: none;
  transition: ${TRANSITIONS.focus};

  &:focus {
    border-color: ${COLORS.hoverTextBlack};
  }
`;

export default TextField;
