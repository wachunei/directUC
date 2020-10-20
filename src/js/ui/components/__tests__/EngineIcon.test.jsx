import EngineIcon from "../EngineIcon";
import { render, getElement } from "./utils";

describe("EngineIcon Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<EngineIcon />);
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should match snapshot with lightTheme", () => {
    const { container } = render(<EngineIcon />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should match snapshot with darkTheme", () => {
    const { container } = render(<EngineIcon />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should accept props", () => {
    const { container } = render(<EngineIcon width="200px" height="200px" />);
    expect(getElement(container)).toMatchSnapshot();
  });
});
