import styled from "styled-components";

const Section = styled.div`
  padding: 15px 20px;
  background-color: ${({ theme, ghost }) => !ghost && theme.sectionBackground};
  margin-bottom: 15px;

  p {
    margin-top: 0;
    margin-bottom: 15px;
  }
`;

export default Section;
