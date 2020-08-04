import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Label = styled.span`
  display: block;
  font-weight: 500;
  font-size: 14px;
`;

const Caption = styled.span`
  margin-top: 0.2rem;
  display: block;
  font-weight: normal;
  font-size: 12px;
`;

const ControlContainer = styled.div`
  ${Label} {
    margin-bottom: 0.2rem;
  }
  margin-bottom: 0.5rem;
`;

function FormControl({ label, caption, children }) {
  return (
    <ControlContainer>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        {label && <Label>{label}</Label>}
        {children}
        {caption && <Caption>{caption}</Caption>}
      </label>
    </ControlContainer>
  );
}

FormControl.propTypes = {
  label: PropTypes.string,
  caption: PropTypes.string,
  children: PropTypes.node.isRequired,
};

FormControl.defaultProps = {
  label: undefined,
  caption: undefined,
};

export default FormControl;
