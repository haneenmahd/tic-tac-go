import styled from "styled-components";
import Head from "next/head";
import NavBar from "components/NavBar";
import Hero from "components/Hero";
import { QUERIES } from "components/constants";

const Wrapper = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (${QUERIES.small}) {
    height: calc(100vh - 90px);
    justify-content: space-between;
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Tic Tac Go</title>
        <meta name="description" content="Home - Pair among random players and enjoy a wonderful tic tac toe game with 5 rounds. Let's see who wins!" />
      </Head>

      <Wrapper>
        <NavBar />

        <Hero />
      </Wrapper>
    </>
  );
};