import PopupBar from "../PopupBar";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("PopupBar Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<PopupBar />);
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const tree = renderTree(<PopupBar />, "lightTheme");
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const tree = renderTree(<PopupBar />, "darkTheme");
    expect(tree).toMatchSnapshot();
  });
});
