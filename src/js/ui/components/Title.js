import styled from "styled-components";

const Title = styled.h2`
  display: ${(props) => (props.inline ? "inline-block" : "block")};
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.theme.title};
  font-family: "Red Hat Display", sans-serif;
  margin: 0 0 ${(props) => (props.inline ? "0" : "0.5rem")};
`;
export default Title;
