import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const Label = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
      filter: grayscale(100%) opacity(70%);
    `};
`;

const CheckMark = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: ${(props) => props.theme.colors.inputBackground};
  border: 1px solid ${(props) => props.theme.colors.inputBorder};
  margin-right: 0.8rem;
  flex: none;
  position: relative;

  &::after {
    display: block;
    opacity: 0;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0.4rem;
    height: 0.8rem;
    border: 2px solid ${(props) => props.theme.colors.primary};
    border-width: 0 2px 2px 0;
    transform: translate(100%, 15%) rotate(45deg);
    transform-origin: 100% 0%;
    transition: opacity 0.05s;
  }

  ${Label}:hover & {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const CheckboxInput = styled.input.attrs({
  type: "checkbox",
})`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  &:focus ~ ${CheckMark} {
    border: 1px solid ${(props) => props.theme.colors.primary};
    outline: 1px solid ${(props) => props.theme.colors.primary};
  }
  &:checked ~ ${CheckMark}::after {
    opacity: 1;
  }
`;

function Checkbox({ children, disabled, ...props }) {
  return (
    <Label disabled={disabled}>
      <CheckboxInput {...props} disabled={disabled} />
      <CheckMark />
      <span>{children}</span>
    </Label>
  );
}

Checkbox.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  children: "",
  disabled: false,
};

export default Checkbox;
