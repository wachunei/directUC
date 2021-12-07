import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import theme, { darkTheme, lightTheme } from "../../theme";

const ColorSchemeThemeProvider = (props) => {
  const { colorScheme, primaryColor } = useSelector((state) => state.options);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  useEffect(() => {
    const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (query) => {
      switch (colorScheme) {
        // always light
        case "light": {
          setSelectedTheme(lightTheme(primaryColor));
          break;
        }
        // always dark
        case "dark": {
          setSelectedTheme(darkTheme(primaryColor));
          break;
        }
        // automatic
        case "auto":
        default: {
          setSelectedTheme(
            query.matches ? darkTheme(primaryColor) : lightTheme(primaryColor)
          );
          break;
        }
      }
    };
    listener(darkMediaQuery);
    darkMediaQuery.addEventListener("change", listener);

    return () => darkMediaQuery.removeEventListener("change", listener);
  }, [colorScheme, primaryColor]);
  return <ThemeProvider theme={selectedTheme} {...props} />;
};
export default ColorSchemeThemeProvider;
