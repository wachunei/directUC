import { render as renderer } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import * as themes from "../../theme";
import theme from "../../theme";

export const render = (node, customTheme) =>
  renderer(
    <ThemeProvider
      theme={customTheme && themes[customTheme] ? themes[customTheme] : theme}
    >
      {node}
    </ThemeProvider>
  );

export const getElement = (container) => container?.firstChild;
