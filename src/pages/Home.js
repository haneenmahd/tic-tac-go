import * as React from "react";
import { Button, COLORS, FlexDiv } from "../styling";
import SymbolO from "../assets/svg/O-symbol.svg";
import SymbolX from "../assets/svg/X-symbol.svg";

const Home = () => {
  return (
    <FlexDiv flexHeight>
      <FlexDiv direction="row">
        <img src={SymbolX} alt="X symbol" />
        <img src={SymbolO} alt="O symbol" />
      </FlexDiv>

      <FlexDiv direction="column">
        <h2
          style={{
            color: COLORS.blue,
          }}
        >
          Choose your play mode
        </h2>

        <FlexDiv direction="column" gap="20px">
          <Button>With AI</Button>
          <Button secondary>With a friend</Button>
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  );
};

export default Home;
