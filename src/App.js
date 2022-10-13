import * as React from "react";
import "./App.css";
import styled, { keyframes } from "styled-components";

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

class App extends React.Component {
  render() {
    return <AppWraper>{this.props.children}</AppWraper>;
  }
}

export default App;
