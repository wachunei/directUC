import Brand from "../Brand";
import { render, getElement } from "./utils";

describe("Brand Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<Brand />);
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should match snapshot with light theme", () => {
    const { container } = render(<Brand />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should match snapshot with dark theme", () => {
    const { container } = render(<Brand />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should accept props", () => {
    const { container } = render(<Brand width="200px" />);
    expect(getElement(container)).toMatchSnapshot();
  });
});
