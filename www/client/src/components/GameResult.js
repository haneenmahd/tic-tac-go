import React from 'react';
import styled, { keyframes } from 'styled-components';
import { COLORS, Divider, TRANSITIONS } from '../styling';
import Avatar from 'boring-avatars';
import GameActions from './GameActions';
import ArrowRight from "../assets/svg/icons/arrow-right.svg";

const FadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 150px);;
    max-width: 100vw;
    padding: 3rem;
    animation: ${FadeIn} 1s ${TRANSITIONS.load};
`;

const HeaderContainer = styled.div`
    text-align: center;
    line-height: 36px;
    
    h1 {
        font-weight: 400;
        font-size: 30px;
    }

    h3 {
        font-weight: 400;
        font-size: 15px;
        color: ${COLORS.gray}
    }
`;

const MatchPreview = styled.div`
    margin: 3rem 0;
    display: grid;
    grid-template-columns: repeat(3, 100px);
    align-items: center;
    justify-items: center;
    place-items: center;
`;

const MatchPreviewAvatar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    font-size: 20px;

    svg {
        border-radius: 100%;
    }
`;

const GameResult = ({
    playerName,
    playerAvatar,
    playerScore,
    opponentName,
    opponentAvatar,
    opponentScore,
    avatarProps
}) => {
    const didPlayerWin = playerScore > opponentScore ? true : playerScore < opponentScore ? false : null;
    const title = didPlayerWin ? "Congratulations!" : didPlayerWin === false ? "Bad luck :(" : "Well Played!";
    const description = (playerWon) => {
        if (!playerWon) {
            return "Both of you have won the game. It was competitive and a great one!";
        } else if (playerWon === playerName) {
            return "You won the game. Well Played!";
        } else if (playerWon !== playerName) {
            return `${playerWon} has won the game. But well played! Good luck with your next game.`;
        }
    };

    return (
        <Container>
            <HeaderContainer>
                <h1>{title}</h1>
                <h3>
                    {
                        description(
                            didPlayerWin ? playerName : didPlayerWin === false ? opponentName : null
                        )
                    }
                </h3>
            </HeaderContainer>

            <MatchPreview>
                <MatchPreviewAvatar>
                    <span>{playerScore}</span>
                    <Avatar
                        name={playerAvatar}
                        size={70}
                        {...avatarProps} />
                </MatchPreviewAvatar>

                <Divider maxWidth />

                <MatchPreviewAvatar>
                    <span>{opponentScore}</span>
                    <Avatar
                        name={opponentAvatar}
                        size={70}
                        {...avatarProps} />
                </MatchPreviewAvatar>
            </MatchPreview>

            <GameActions
                primaryTitle="Go Home"
                primaryIcon={
                    <img
                        src={ArrowRight}
                        alt="arrow up icon"
                    />
                }
                secondaryTitle="Continue in Chat"
            />
        </Container>
    );
}

export default GameResult;