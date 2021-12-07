import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { darken } from "polished";
import { COLORS } from "../theme";

const CircleButton = styled.button`
  display: inline-flex;
  appearance: none;
  height: 45px;
  width: 45px;
  background: ${(props) => COLORS[props.value]};
  font-size: 24px;
  border-radius: 50%;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  margin: 5px 10px 5px 0px;
  border-style: solid;
  border-width: 2px;
  border-color: transparent;
  overflow: hidden;
  line-height: 0;
  align-items: center;
  justify-content: center;

  span {
    display: none;
  }

  ${(props) =>
    props.selected &&
    css`
      border-color: ${darken(0.1, COLORS[props.value])};
    `};

  &:disabled {
    cursor: not-allowed;
    filter: grayscale(100%) opacity(80%);
  }

  &:focus {
    outline-width: 2px;
    outline-color: ${(props) => darken(0.1, COLORS[props.value])};
  }
  &:last-child {
    margin-right: 0;
  }
`;

const ColorButton = ({ label, emoji, ...props }) => (
  <CircleButton {...props}>
    <span>{label}</span>
    {emoji}
  </CircleButton>
);

ColorButton.propTypes = {
  label: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
};

export default ColorButton;
