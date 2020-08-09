import React from "react";
import HorizontalSeparator from "../HorizontalSeparator";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("HorizontalSeparator Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<HorizontalSeparator />);
    expect(tree).toMatchSnapshot();
  });
});
