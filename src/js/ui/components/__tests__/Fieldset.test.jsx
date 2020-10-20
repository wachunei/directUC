import Fieldset from "../Fieldset";
import { render, getElement } from "./utils";

describe("Fieldset Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<Fieldset />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const { container } = render(<Fieldset />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const { container } = render(<Fieldset />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
});
