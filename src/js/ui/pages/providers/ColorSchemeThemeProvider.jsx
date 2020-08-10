import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import theme, { darkTheme, lightTheme } from "../../theme";

const ColorSchemeThemeProvider = (props) => {
  const { colorScheme } = useSelector((state) => state.options);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  useEffect(() => {
    const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (query) => {
      switch (colorScheme) {
        // always light
        case "light": {
          setSelectedTheme(lightTheme);
          break;
        }
        // always dark
        case "dark": {
          setSelectedTheme(darkTheme);
          break;
        }
        // automatic
        case "auto":
        default: {
          setSelectedTheme(query.matches ? darkTheme : lightTheme);
          break;
        }
      }
    };
    listener(darkMediaQuery);
    darkMediaQuery.addListener(listener);

    return () => darkMediaQuery.removeListener(listener);
  }, [colorScheme]);
  return <ThemeProvider theme={selectedTheme} {...props} />;
};
export default ColorSchemeThemeProvider;
