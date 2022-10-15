import styled from "styled-components";
import { COLORS } from "../styling";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;

  a {
    margin: 0 0.3rem;
    color: ${COLORS.blue};
    font-weight: 600;
    transition: color 150ms ease-in-out;

    &:hover {
      color: ${COLORS.blue}90;
    }
  }
`;

const Footer = () => (
  <Container>
    Made with ❤️ by <a href="https://haneenmahd.github.io">Haneen Mahdin</a>
  </Container>
);

export default Footer;
