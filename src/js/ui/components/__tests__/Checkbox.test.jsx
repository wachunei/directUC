import React from "react";
import Checkbox from "../Checkbox";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Checkbox Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<Checkbox>A test checkbox</Checkbox>);
    expect(tree).toMatchSnapshot();
  });

  test("should render checked", () => {
    const tree = renderTree(<Checkbox checked>A test checkbox</Checkbox>);
    expect(tree).toMatchSnapshot();
  });
  test("should render disabled", () => {
    const tree = renderTree(<Checkbox disabled>A test checkbox</Checkbox>);
    expect(tree).toMatchSnapshot();
  });
});
