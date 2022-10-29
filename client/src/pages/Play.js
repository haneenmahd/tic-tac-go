import styled from "styled-components";
import { FlexDiv } from "../styling";
import { LinkLessNav } from "../components/NavBar";
import Avatar from "boring-avatars";

const Play = props => {
  return (
    <FlexDiv flexDirection="column" flexHeight>
      <LinkLessNav />
    </FlexDiv>
  );
};

export default Play;
