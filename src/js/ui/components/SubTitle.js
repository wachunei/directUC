import styled from "styled-components";
import Title from "./Title";

const SubTitle = styled(Title).attrs({ as: "h3" })`
  font-size: 18px;
`;

export default SubTitle;
