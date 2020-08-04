import styled from "styled-components";

const IconButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 15px;
  height: 15px;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(50%);
  }

  &:focus:not(:hover) {
    outline-width: 2px;
  }

  &:focus:hover {
    outline: none;
  }
`;

export default IconButton;
