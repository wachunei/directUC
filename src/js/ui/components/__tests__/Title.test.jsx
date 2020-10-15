import Title from "../Title";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Title Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<Title />);
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const tree = renderTree(<Title />, "lightTheme");
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const tree = renderTree(<Title />, "darkTheme");
    expect(tree).toMatchSnapshot();
  });
});
