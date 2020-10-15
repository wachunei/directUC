import Logo from "../Logo";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Logo Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<Logo />);
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const tree = renderTree(<Logo />, "lightTheme");
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const tree = renderTree(<Logo />, "darkTheme");
    expect(tree).toMatchSnapshot();
  });

  test("should accept props", () => {
    const tree = renderTree(<Logo width="200px" />);
    expect(tree).toMatchSnapshot();
  });
});
