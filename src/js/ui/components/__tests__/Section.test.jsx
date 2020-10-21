import Section from "../Section";
import { render, getElement } from "./utils";

describe("Section Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<Section />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with ghost", () => {
    const { container } = render(<Section ghost />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const { container } = render(<Section />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const { container } = render(<Section />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
});
