import Spinner from "../Spinner";
import { render, getElement } from "./utils";

describe("Spinner Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<Spinner />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const { container } = render(<Spinner />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const { container } = render(<Spinner />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
});
