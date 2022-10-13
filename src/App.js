import { useEffect } from "react";
import "./App.css";
import styled, { keyframes } from "styled-components";
import { useLocation } from "react-router-dom";

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
  padding: 0 3rem;
  animation: ${FadeIn} 0.3s ease-out;
`;

const App = (props) => {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  };
  return (
    <>
      <ScrollToTop />
      <AppWraper>{props.children}</AppWraper>
    </>
  );
};

export default App;
