import styled from "styled-components";
import NavLink from "../components/NavLink";
import { COLORS } from "../styling";
import Divider from "./Divider";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 33px 30px;
  gap: 56px;
  width: 100vw;
`;

const FooterLink = styled(NavLink)`
  color: ${COLORS.gray};
`;

const Footer = () => (
  <Container>
    <FooterLink to="/about">About</FooterLink>
    <FooterLink to="/support">Support</FooterLink>
    <FooterLink to="/privacy-policy">Privacy</FooterLink>
    <Divider />
  </Container>
);

export default Footer;
