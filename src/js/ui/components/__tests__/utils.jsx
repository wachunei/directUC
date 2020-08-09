import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";
import themes from "../../theme";

export const render = (node, theme) =>
  renderer.create(
    <ThemeProvider theme={theme ? themes[theme] : themes}>{node}</ThemeProvider>
  );

export const renderTree = (...args) => render(...args).toJSON();
