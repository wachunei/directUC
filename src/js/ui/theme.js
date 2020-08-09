const colors = {
  primary: "#1F95EB",
  white: "#FFFFFF",
  gray0: "#FAFAFA",
  gray1: "#E0E0E0",
  gray2: "#909090",
  gray3: "#505050",
  gray4: "#303030",
};

const theme = {
  primary: colors.primary,
  outline: colors.primary,
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
  inputFocusBorder: colors.primary,
  checkboxHoverBorder: colors.primary,
  checkboxFocusBorder: colors.primary,
  checkMark: colors.primary,
  buttonBackground: colors.gray1,
  buttonForeground: colors.gray3,
  buttonBackgroundPrimary: colors.primary,
  buttonForegroundPrimary: colors.white,
  horizontalSeparator: colors.gray1,
};

export const lightTheme = theme;
export const darkTheme = theme;
export default theme;
