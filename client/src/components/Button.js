import styled from "styled-components";
import { COLORS, TRANSITIONS } from "../styling";

const Button = styled.button`
  width: 91px;
  height: 45px;
  background: ${COLORS.black};
  color: ${COLORS.white};
  border-radius: 30px;
  outline: none;
  transition: ${TRANSITIONS.hovers};

  &:hover {
    background-color: ${COLORS.lightGray};
  }
`;

const SecondaryButton = styled(Button)`
  background: ${COLORS.fadedGray};
  border: 1px solid ${COLORS.lightGray};
  width: 405px;
  color: ${COLORS.black};
`;

export { SecondaryButton };
export default Button;
