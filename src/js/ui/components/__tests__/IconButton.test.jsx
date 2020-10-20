import IconButton from "../IconButton";
import { render, getElement } from "./utils";

describe("IconButton Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<IconButton />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const { container } = render(<IconButton />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const { container } = render(<IconButton />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
});
