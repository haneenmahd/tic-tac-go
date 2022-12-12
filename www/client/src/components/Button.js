import styled from "styled-components";
import { COLORS, TRANSITIONS } from "../styling";

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 91px;
  height: 45px;
  padding: 0 0.8rem;
  background: ${COLORS.black};
  color: ${COLORS.white};
  border-radius: 30px;
  outline: none;
  transition: ${TRANSITIONS.hovers};

  &:hover {
    background-color: ${COLORS.gray};
  }

  &:active {
    scale: 0.99;
  }
`;

const SecondaryButton = styled(Button)`
  width: 405px;
  background: ${COLORS.fadedGray};
  border: 1px solid ${COLORS.lightGray};
  color: ${COLORS.black};

  &:hover {
    background-color: ${COLORS.lightGray};
  }
`;

export { SecondaryButton };
export default Button;
