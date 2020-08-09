import { createGlobalStyle } from "styled-components";
import RedHatTextRegular from "../../../fonts/RedHatText-Regular.ttf";
import RedHatTextMedium from "../../../fonts/RedHatText-Medium.ttf";
import RedHatDisplayRegular from "../../../fonts/RedHatDisplay-Regular.ttf";
import RedHatDisplayMedium from "../../../fonts/RedHatDisplay-Medium.ttf";

export default createGlobalStyle`
  @font-face {
    font-family: "Red Hat Text";
    font-weight: normal;
    src: url(${RedHatTextRegular});
    font-display: fallback;
  }
  @font-face {
    font-family: "Red Hat Text";
    font-weight: 500;
    src: url(${RedHatTextMedium});
    font-display: fallback;
  }
  @font-face {
    font-family: "Red Hat Display";
    font-weight: normal;
    src: url(${RedHatDisplayRegular});
    font-display: fallback;
  }
  @font-face {
    font-family: "Red Hat Display";
    font-weight: 500;
    src: url(${RedHatDisplayMedium});
    font-display: fallback;
  }

  * {
    box-sizing: border-box;
    :focus {
      outline: 1px solid ${(props) => props.theme.outline};
    }
  }

  ::selection {
    background: ${(props) => props.theme.selectionBackground};
    color: ${(props) => props.theme.selectionForeground};
  }

  body {
    background: ${(props) => props.theme.bodyBackground};
    margin: 0 auto;
    padding: 0;
    font-family: "Red Hat Text", sans-serif;
    font-size: 16px;
    color: ${(props) => props.theme.body};
  }

  input,
  select {
    font-family: "Red Hat Text", sans-serif;
    font-size: 16px;
    color: ${(props) => props.theme.inputForeground};
  }

  button {
    font-family: "Red Hat Text", sans-serif;
    font-size: 16px;
    color: ${(props) => props.theme.buttonForeground};
  }
`;

export const OptionsStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.bodyBackground};
    width: 100%;
    max-width: 700px;
  }
`;

export const PopupStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.popupBackground};
    padding: 10px 15px;
    width: 250px;
    position: relative;
  }
`;

export const PopupDirectModeStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.popupBackground};
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
`;
