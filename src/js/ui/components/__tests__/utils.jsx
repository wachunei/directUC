import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";
import * as themes from "../../theme";
import theme from "../../theme";

export const render = (node, customTheme) =>
  renderer.create(
    <ThemeProvider
      theme={customTheme && themes[customTheme] ? themes[customTheme] : theme}
    >
      {node}
    </ThemeProvider>
  );

export const renderTree = (...args) => render(...args).toJSON();
