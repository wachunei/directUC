import styled from "styled-components";

const PopupBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;

  &:first-of-type {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export default PopupBar;
