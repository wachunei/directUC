import React from "react";
import Input from "../Input";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Input Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<Input />);
    expect(tree).toMatchSnapshot();
  });

  test("should accept props", () => {
    const tree = renderTree(<Input type="text" value="Input value" />);
    expect(tree).toMatchSnapshot();
  });
});
