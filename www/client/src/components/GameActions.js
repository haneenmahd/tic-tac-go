import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS, QUERIES } from '../styling';
import Button from './Button';


const GameActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 29px;
  transition: opacity 200ms;

  ${p => p.disabled && css`
    opacity: 0.5;
    pointer-events: none;
  `}

  @media screen and (${QUERIES.small}) {
    flex-direction: column;
  }
`;

const GameActionButton = styled(Button)`
  font-weight: 500;
  padding: 0 20px;
  color: ${COLORS.black};
  background: ${COLORS.blue};

  &:hover {
    background: ${COLORS.secondaryHoverBackground};
  }
`;

const GameActionButtonSecondary = styled(GameActionButton)`
  font-weight: normal;
  border: 1px solid ${COLORS.blue};
  background: ${COLORS.fadedBlue};

  &:hover {
    background: ${COLORS.blue}90;
  }
`;

const GameActions = ({
  disabled,
  primaryTitle,
  primaryAction,
  primaryIcon,
  secondaryTitle,
  secondaryAction,
  secondaryIcon
}) => {
  return (
    <GameActionsContainer disabled={disabled}>
      <GameActionButton onClick={primaryAction}>
        {primaryTitle}

        {primaryIcon}
      </GameActionButton>

      <GameActionButtonSecondary onClick={secondaryAction}>
        {secondaryTitle}

        {secondaryIcon}
      </GameActionButtonSecondary>
    </GameActionsContainer>
  );
}

export default GameActions;