import styled, { css } from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: ${({ $horizontal }) => ($horizontal ? "row" : "column")};

  ${({ $horizontal, $center, $start, $end, $between, $around }) => {
    if (!$horizontal) {
      if ($start) {
        return css`
          align-items: flex-start;
        `;
      }
      if ($center) {
        return css`
          align-items: center;
        `;
      }
      if ($end) {
        return css`
          align-items: flex-end;
        `;
      }
      return null;
    }

    if ($start) {
      return css`
        justify-content: flex-start;
      `;
    }
    if ($center) {
      return css`
        justify-content: center;
      `;
    }
    if ($end) {
      return css`
        justify-content: flex-end;
      `;
    }
    if ($between) {
      return css`
        justify-content: space-between;
      `;
    }
    if ($around) {
      return css`
        justify-content: space-around;
      `;
    }
    return null;
  }}

  ${({ $horizontal, $top, $middle, $bottom }) => {
    if ($horizontal) {
      if ($top) {
        return css`
          align-items: flex-start;
        `;
      }
      if ($middle) {
        return css`
          align-items: center;
        `;
      }
      if ($bottom) {
        return css`
          align-items: flex-end;
        `;
      }
      return null;
    }
    return null;
  }}
`;

export default Box;
