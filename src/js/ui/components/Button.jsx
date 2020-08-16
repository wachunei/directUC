import styled, { css } from "styled-components";

const Button = styled.button`
  border: 0;
  padding: 0.5rem 1rem;
  font-size: 12px;
  text-shadow: none;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  appearance: none;
  transition: filter 0.1s;

  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}

  background: ${(props) =>
    props.primary
      ? props.theme.buttonBackgroundPrimary
      : props.theme.buttonBackground};

  color: ${(props) =>
    props.primary
      ? props.theme.buttonForegroundPrimary
      : props.theme.buttonForeground};

  &:disabled {
    cursor: not-allowed;
    filter: grayscale(100%) opacity(80%);
  }

  &:focus {
    outline-width: 2px;
  }

  &&:not(:disabled):active {
    filter: brightness(95%);
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    filter: brightness(105%);
  }
`;
export default Button;
