import SubTitle from "../SubTitle";
import { render, getElement } from "./utils";

describe("SubTitle Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<SubTitle />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const { container } = render(<SubTitle />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const { container } = render(<SubTitle />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
});
