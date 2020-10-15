import SubTitle from "../SubTitle";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("SubTitle Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<SubTitle />);
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const tree = renderTree(<SubTitle />, "lightTheme");
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const tree = renderTree(<SubTitle />, "darkTheme");
    expect(tree).toMatchSnapshot();
  });
});
