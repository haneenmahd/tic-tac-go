import styled, { keyframes } from "styled-components";
import { TRANSITIONS } from "../styling";

const FadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const AppWraper = styled.div`
  min-height: 100vh;
  animation: ${FadeIn} 1s ${TRANSITIONS.load};
`;

export default AppWraper;
