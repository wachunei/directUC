import React from "react";
import EngineIcon from "../EngineIcon";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("EngineIcon Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<EngineIcon />);
    expect(tree).toMatchSnapshot();
  });

  test("should accept props", () => {
    const tree = renderTree(<EngineIcon width="200px" height="200px" />);
    expect(tree).toMatchSnapshot();
  });
});
