import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    :focus {
      outline: 1px solid ${(props) => props.theme.colors.primary};
    }
  }

  ::selection {
    background: ${(props) => props.theme.colors.primary};
    color: white;
  }

  body {
    background: ${(props) => props.theme.colors.bodyBackground};
    margin: 0 auto;
    padding: 0;
    font-family: "Red Hat Text", sans-serif;
    font-size: 16px;
    color: ${(props) => props.theme.colors.body};
  }

  input,
  button,
  select {
    font-family: "Red Hat Text", sans-serif;
    font-size: 16px;
    color: ${(props) => props.theme.colors.body};
  }
`;

export const OptionsStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.colors.bodyBackground};
    width: 100%;
    max-width: 700px;
  }
`;

export const PopupStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.colors.popupBackground};
    padding: 10px 15px;
    width: 250px;
    position: relative;
  }
`;

export const PopupDirectModeStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.colors.popupBackground};
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
`;
