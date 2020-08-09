import React from "react";
import Button from "../Button";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Button Component", () => {
  test("default should match snapshot", () => {
    const tree = renderTree(<Button>Click Me!</Button>);
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
