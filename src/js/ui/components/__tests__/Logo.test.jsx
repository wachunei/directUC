import React from "react";
import Logo from "../Logo";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Logo Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<Logo />);
    expect(tree).toMatchSnapshot();
  });

  test("should accept props", () => {
    const tree = renderTree(<Logo width="200px" />);
    expect(tree).toMatchSnapshot();
  });
});
