import styled from "styled-components";

const Input = styled.input`
  border: 1px solid ${(props) => props.theme.colors.inputBorder};
  background: ${(props) => props.theme.colors.inputBackground};
  padding: 0.5rem;
  border-radius: 0;
  width: ${(props) => (props.block ? "100%" : "unset")};

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }

  &:disabled {
    cursor: not-allowed;
    filter: grayscale(100%) opacity(70%);
  }
`;

export default Input;
