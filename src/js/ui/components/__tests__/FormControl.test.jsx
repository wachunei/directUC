import FormControl from "../FormControl";
import { render, getElement } from "./utils";

describe("FormControl Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<FormControl>control</FormControl>);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const { container } = render(
      <FormControl>control</FormControl>,
      "lightTheme"
    );
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const { container } = render(
      <FormControl>control</FormControl>,
      "darkTheme"
    );
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should render label", () => {
    const { container } = render(
      <FormControl label="A label">control</FormControl>
    );
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should render caption", () => {
    const { container } = render(
      <FormControl label="A label" caption="A caption">
        control
      </FormControl>
    );
    expect(getElement(container)).toMatchSnapshot();
  });
});
