import styled from "styled-components";
import { COLORS } from "./constants";

const Divider = styled.div<{
    fit?: boolean;
    maxWidth?: boolean;
}>`
  width: ${props => (props.fit ? "10%" : props.maxWidth ? "100%" : "405px")};
  height: 1px;
  background-color: ${COLORS.fadedGray};
`;

export default Divider;