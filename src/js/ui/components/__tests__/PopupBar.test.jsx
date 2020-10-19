import PopupBar from "../PopupBar";
import { render, getElement } from "./utils";

describe("PopupBar Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<PopupBar />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const { container } = render(<PopupBar />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const { container } = render(<PopupBar />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
});
