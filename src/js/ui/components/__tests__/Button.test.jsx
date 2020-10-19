import Button from "../Button";
import { render, getElement } from "./utils";

describe("Button Component", () => {
  test("default should match snapshot", () => {
    const { container } = render(<Button>Click Me!</Button>);
    expect(getElement(container)).toMatchSnapshot();
  });

  test("default should match snapshot with lightTheme", () => {
    const { container } = render(<Button>Click Me!</Button>, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });

  test("default should match snapshot with darkTheme", () => {
    const { container } = render(<Button>Click Me!</Button>, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should render primary", () => {
    const { container } = render(<Button primary>Click Me!</Button>);
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should render block", () => {
    const { container } = render(<Button block>Click Me!</Button>);
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should render disabled", () => {
    const { container } = render(<Button disabled>Click Me!</Button>);
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should render primary block", () => {
    const { container } = render(
      <Button primary block>
        Click Me!
      </Button>
    );
    expect(getElement(container)).toMatchSnapshot();
  });
});
