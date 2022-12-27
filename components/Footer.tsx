import styled from "styled-components";
import NavLink from "./NavLink";
import Divider from "./Divider";
import { COLORS, QUERIES } from "./constants";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 33px 30px;
  gap: 2rem;
  width: 100vw;

  @media screen and (${QUERIES.small}) {
    justify-content: center;
  }
`;

const FooterLink = styled(NavLink)`
  color: ${COLORS.gray};
`;

const FooterDivider = styled(Divider)`
  @media screen and (${QUERIES.small}) {
    display: none;
  }
`;

const Footer = () => (
  <Container>
    <FooterLink to="/about">About</FooterLink>
    <FooterLink to="/support">Support</FooterLink>
    <FooterLink to="/privacy-policy">Privacy</FooterLink>

    <FooterDivider maxWidth />
  </Container>
);

export default Footer;
