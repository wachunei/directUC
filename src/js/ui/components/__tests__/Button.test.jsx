import React from "react";
import Button from "../Button";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Button Component", () => {
  test("default should match snapshot", () => {
    const tree = renderTree(<Button>Click Me!</Button>);
    expect(tree).toMatchSnapshot();
  });

  test("default should match snapshot with lightTheme", () => {
    const tree = renderTree(<Button>Click Me!</Button>, "lightTheme");
    expect(tree).toMatchSnapshot();
  });

  test("default should match snapshot with darkTheme", () => {
    const tree = renderTree(<Button>Click Me!</Button>, "darkTheme");
    expect(tree).toMatchSnapshot();
  });

  test("should render primary", () => {
    const tree = renderTree(<Button primary>Click Me!</Button>);
    expect(tree).toMatchSnapshot();
  });

  test("should render block", () => {
    const tree = renderTree(<Button block>Click Me!</Button>);
    expect(tree).toMatchSnapshot();
  });

  test("should render disabled", () => {
    const tree = renderTree(<Button disabled>Click Me!</Button>);
    expect(tree).toMatchSnapshot();
  });

  test("should render primary block", () => {
    const tree = renderTree(
      <Button primary block>
        Click Me!
      </Button>
    );
    expect(tree).toMatchSnapshot();
  });
});
