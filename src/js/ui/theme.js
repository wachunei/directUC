export const COLORS = {
  blue: "#1F95EB",
  green: "#39AC67",
  red: "#EB5757",
  pink: "#FF80B1",
  purple: "#662FB1",
  orange: "#FF7139",
  black: "#000000",
  white: "#FFFFFF",
  gray0: "#FAFAFA",
  gray1: "#E0E0E0",
  gray2: "#909090",
  gray3: "#505050",
  gray4: "#303030",
  gray5: "#202020",
  gray6: "#191919",
  gray7: "#101010",
};

export const COLORS_UI = [
  { key: "green", label: "Verde", emoji: "🌳" },
  { key: "red", label: "Rojo", emoji: "👹" },
  { key: "pink", label: "Rosa", emoji: "🌸" },
  { key: "purple", label: "Violeta", emoji: "👾" },
  { key: "orange", label: "Anaranjado", emoji: "🍑" },
];

const DEFAULT_PRIMARY = "blue";

export const darkTheme = (primary = DEFAULT_PRIMARY) => {
  const colors = {
    ...COLORS,
    primary: COLORS[primary],
  };
  return {
    primary: colors.primary,
    outline: colors.primary,
    brandColor: colors.white,
    selectionBackground: colors.primary,
    selectionForeground: colors.white,
    currentUserBackground: colors.primary,
    currentUserForeground: colors.white,
    title: colors.gray1,
    popupBackground: colors.gray6,
    body: colors.gray1,
    bodyBackground: colors.gray6,
    sectionBackground: colors.gray5,
    serviceBackground: colors.gray5,
    inputBorder: colors.gray4,
    inputBackground: colors.gray3,
    inputForeground: colors.gray1,
    inputFocusBorder: colors.primary,
    checkboxBackground: colors.gray3,
    checkboxHoverBorder: colors.primary,
    checkboxFocusBorder: colors.primary,
    checkMark: colors.white,
    buttonBackground: colors.gray3,
    buttonForeground: colors.gray1,
    buttonBackgroundPrimary: colors.primary,
    buttonForegroundPrimary: colors.white,
    horizontalSeparator: colors.gray4,
  };
};

const theme = (primary = DEFAULT_PRIMARY) => {
  const colors = {
    ...COLORS,
    primary: COLORS[primary],
  };
  return {
    primary: colors.primary,
    outline: colors.primary,
    brandColor: colors.black,
    selectionBackground: colors.primary,
    selectionForeground: colors.white,
    currentUserBackground: colors.primary,
    currentUserForeground: colors.white,
    title: colors.gray4,
    popupBackground: colors.white,
    body: colors.gray3,
    bodyBackground: colors.white,
    sectionBackground: colors.gray0,
    serviceBackground: colors.gray0,
    inputBorder: colors.gray2,
    inputBackground: colors.white,
    inputForeground: colors.gray3,
    inputFocusBorder: colors.primary,
    checkboxBackground: colors.white,
    checkboxHoverBorder: colors.primary,
    checkboxFocusBorder: colors.primary,
    checkMark: colors.primary,
    buttonBackground: colors.gray1,
    buttonForeground: colors.gray3,
    buttonBackgroundPrimary: colors.primary,
    buttonForegroundPrimary: colors.white,
    horizontalSeparator: colors.gray1,
  };
};

export const lightTheme = theme;
export default lightTheme;
