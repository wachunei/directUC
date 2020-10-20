import Checkbox from "../Checkbox";
import { render, getElement } from "./utils";

describe("Checkbox Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<Checkbox>A test checkbox</Checkbox>);
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should match snapshot with lightTheme", () => {
    const { container } = render(
      <Checkbox>A test checkbox</Checkbox>,
      "lightTheme"
    );
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should match snapshot with darkTheme", () => {
    const { container } = render(
      <Checkbox>A test checkbox</Checkbox>,
      "darkTheme"
    );
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should render checked", () => {
    const { container } = render(
      <Checkbox defaultChecked>A test checkbox</Checkbox>
    );
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should render disabled", () => {
    const { container } = render(<Checkbox disabled>A test checkbox</Checkbox>);
    expect(getElement(container)).toMatchSnapshot();
  });
});
