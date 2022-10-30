import styled from "styled-components";
import { COLORS, TRANSITIONS } from "../styling";

const TextField = styled.input`
  width: 294px;
  height: 45px;
  background: #ffffff;
  border: 1px solid ${COLORS.lightGray};
  border-radius: 30px;
  padding: 14px;
  padding-left: 24px;
  outline: none;
  transition: ${TRANSITIONS.focus};

  &:focus {
    border-color: ${COLORS.black};
  }
`;

export default TextField;
