import FormControl from "../FormControl";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("FormControl Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<FormControl>control</FormControl>);
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const tree = renderTree(<FormControl>control</FormControl>, "lightTheme");
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const tree = renderTree(<FormControl>control</FormControl>, "darkTheme");
    expect(tree).toMatchSnapshot();
  });
  test("should render label", () => {
    const tree = renderTree(<FormControl label="A label">control</FormControl>);
    expect(tree).toMatchSnapshot();
  });
  test("should render caption", () => {
    const tree = renderTree(
      <FormControl label="A label" caption="A caption">
        control
      </FormControl>
    );
    expect(tree).toMatchSnapshot();
  });
});
