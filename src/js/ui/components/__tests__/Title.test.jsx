import Title from "../Title";
import { render, getElement } from "./utils";

describe("Title Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<Title />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const { container } = render(<Title />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const { container } = render(<Title />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
});
