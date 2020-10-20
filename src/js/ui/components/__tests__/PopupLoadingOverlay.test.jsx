import PopupLoadingOverlay from "../PopupLoadingOverlay";
import { render, getElement } from "./utils";

describe("PopupLoadingOverlay Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<PopupLoadingOverlay />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const { container } = render(<PopupLoadingOverlay />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const { container } = render(<PopupLoadingOverlay />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });
});
