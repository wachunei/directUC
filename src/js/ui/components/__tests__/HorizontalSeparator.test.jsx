import HorizontalSeparator from "../HorizontalSeparator";
import { render, getElement } from "./utils";

describe("HorizontalSeparator Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<HorizontalSeparator />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const { container } = render(<HorizontalSeparator />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const { container } = render(<HorizontalSeparator />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
});
