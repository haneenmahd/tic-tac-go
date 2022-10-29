import { useEffect } from "react";
import "./App.css";
import styled, { keyframes } from "styled-components";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";

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
  animation: ${FadeIn} 1s cubic-bezier(0.69, -0.03, 0.2, 1);
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
      <AppWraper>
        {props.children}
        <Footer />
      </AppWraper>
    </>
  );
};

export default App;
