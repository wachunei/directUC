import Fieldset from "../Fieldset";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Fieldset Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<Fieldset />);
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const tree = renderTree(<Fieldset />, "lightTheme");
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const tree = renderTree(<Fieldset />, "darkTheme");
    expect(tree).toMatchSnapshot();
  });
});
