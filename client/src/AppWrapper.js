import { useEffect } from "react";
import "./App.css";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import styled, { keyframes } from "styled-components";
import { TRANSITIONS } from "./styling";

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

const App = props => {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  };
  return (
    <>
      <ScrollToTop />
      <AppWraper>
        {props.children}
        <Footer />
      </AppWraper>
    </>
  );
};

export default App;
