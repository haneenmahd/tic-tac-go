import styled, { css } from "styled-components";
import { COLORS, TRANSITIONS } from "./constants";

const Button = styled.button<{
  noScaling?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  gap: 0.5rem;
  min-width: 91px;
  height: 45px;
  padding: 0 0.8rem;
  cursor: pointer;
  background: ${COLORS.black};
  color: ${COLORS.white};
  border: 1px hidden ${COLORS.black};
  border-radius: 30px;
  outline: none;
  transition: ${TRANSITIONS.hovers};

  &:hover {
    background-color: ${COLORS.white};
    border-style: solid;
    color: ${COLORS.black};

    svg {
      stroke: ${COLORS.black};
    }
  }

  ${p => !p.noScaling && css`
    &:active {
      scale: 0.99;
    }
  `}
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
