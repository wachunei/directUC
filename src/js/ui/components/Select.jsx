import styled from "styled-components";

const Select = styled.select`
  box-sizing: border-box;
  appearance: none;
  border: 1px solid ${(props) => props.theme.colors.inputBorder};
  background: white;
  padding: 0.5rem 1.6rem 0.5rem 0.5rem;
  border-radius: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='13' height='13' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M9.48486 4.24268L5.24219 8.48535L0.999512 4.24268' stroke='%23909090'/%3E %3C/svg%3E ");
  background-repeat: no-repeat;
  background-position: right 0.5rem top calc(50% - 1px);
  transition: filter 0.05s;

  &:focus:not(:disabled) {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }

  :disabled {
    cursor: not-allowed;
    filter: grayscale(100%) opacity(60%);
  }
`;

export default Select;
