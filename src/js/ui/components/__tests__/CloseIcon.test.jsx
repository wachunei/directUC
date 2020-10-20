import CloseIcon from "../CloseIcon";
import { render, getElement } from "./utils";

describe("CloseIcon Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<CloseIcon />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const { container } = render(<CloseIcon />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const { container } = render(<CloseIcon />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should accept props", () => {
    const { container } = render(<CloseIcon width="200px" height="200px" />);
    expect(getElement(container)).toMatchSnapshot();
  });
});
