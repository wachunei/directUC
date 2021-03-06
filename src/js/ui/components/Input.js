import styled from "styled-components";

const Input = styled.input`
  border: 1px solid ${(props) => props.theme.inputBorder};
  background: ${(props) => props.theme.inputBackground};
  padding: 0.5rem;
  border-radius: 0;
  width: ${(props) => (props.block ? "100%" : "unset")};

  &:focus {
    border: 1px solid ${(props) => props.theme.inputFocusBorder};
  }

  &:disabled {
    cursor: not-allowed;
    filter: grayscale(100%) opacity(70%);
  }
`;

export default Input;
