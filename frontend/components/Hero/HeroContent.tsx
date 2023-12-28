import { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";

const HeroTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroTitle = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeroText = styled.h1<{
    active?: boolean;
}>`
  color: ${p => p.active ? "transparent" : COLORS.black};
  font-size: 2.5rem;
  background: repeating-radial-gradient(#000 -20.22%, #0C8F8F 76.38%, rgba(0, 0, 0, 0) 93.28%);
  background-clip: text;
  -webkit-background-clip: text;
  font-weight: 800;
  transition: color 250ms ease-in;
`;

const HeroDescription = styled.p`
  font-size: 1rem;
  color: ${COLORS.gray};
  line-height: 1.8rem;
`;

export default function HeroContent() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timeout = setInterval(() => {
            if (activeIndex >= 2) {
                setActiveIndex(0);
            } else {
                setActiveIndex(index => index + 1);
            }
        }, 1000);

        return () => clearInterval(timeout);
    });

    return (
        <HeroTextWrapper>
            <HeroTitle>
                <HeroText active={activeIndex === 0}>Tic.</HeroText>
                <HeroText active={activeIndex === 1}>Tac.</HeroText>
                <HeroText active={activeIndex === 2}>Go.</HeroText>
            </HeroTitle>
            <HeroDescription>
                Play Tic Tac Toe with random people around the world. You will be paired to a random player and you both will playing the game simultaneously. You will have 5 rounds, the one with the greater score wins.
            </HeroDescription>
        </HeroTextWrapper>
    );
}