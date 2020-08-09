import React from "react";
import CloseIcon from "../CloseIcon";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("CloseIcon Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<CloseIcon />);
    expect(tree).toMatchSnapshot();
  });

  test("should accept props", () => {
    const tree = renderTree(<CloseIcon width="200px" height="200px" />);
    expect(tree).toMatchSnapshot();
  });
});
