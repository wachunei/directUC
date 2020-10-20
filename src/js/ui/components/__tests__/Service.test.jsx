import Service from "../Service";
import { render, getElement } from "./utils";

describe("Service Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<Service />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const { container } = render(<Service />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const { container } = render(<Service />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
});
