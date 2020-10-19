import Logo from "../Logo";
import { render, getElement } from "./utils";

describe("Logo Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<Logo />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const { container } = render(<Logo />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const { container } = render(<Logo />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should accept props", () => {
    const { container } = render(<Logo width="200px" />);
    expect(getElement(container)).toMatchSnapshot();
  });
});
