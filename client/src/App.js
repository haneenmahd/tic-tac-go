import { useEffect } from "react";
import "./App.css";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import AppWraper from "./components/AppWrapper";

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
