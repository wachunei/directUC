import styled, { keyframes } from "styled-components";
import { COLORS } from "../theme";

function Spinner({ ...props }) {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M43 22.5C43 33.8218 33.8218 43 22.5 43S2 33.8218 2 22.5 11.1782 2 22.5 2"
        strokeWidth="4"
      />
    </svg>
  );
}

const rotation = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotatingSpinner = styled(Spinner)`
  animation: ${rotation} 1s ease infinite;
  stroke: ${(props) => COLORS[props.color]};
`;

export default RotatingSpinner;
