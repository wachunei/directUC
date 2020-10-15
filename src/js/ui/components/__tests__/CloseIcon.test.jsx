import CloseIcon from "../CloseIcon";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("CloseIcon Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<CloseIcon />);
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const tree = renderTree(<CloseIcon />, "lightTheme");
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const tree = renderTree(<CloseIcon />, "darkTheme");
    expect(tree).toMatchSnapshot();
  });

  test("should accept props", () => {
    const tree = renderTree(<CloseIcon width="200px" height="200px" />);
    expect(tree).toMatchSnapshot();
  });
});
