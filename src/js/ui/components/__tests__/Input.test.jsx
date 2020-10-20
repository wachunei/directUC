import Input from "../Input";
import { render, getElement } from "./utils";

describe("Input Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<Input />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const { container } = render(<Input />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const { container } = render(<Input />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should accept props", () => {
    const { container } = render(
      <Input type="text" defaultValue="Input value" />
    );
    expect(getElement(container)).toMatchSnapshot();
  });
});
