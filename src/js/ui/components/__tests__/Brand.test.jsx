import React from "react";
import Brand from "../Brand";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Brand Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<Brand />);
    expect(tree).toMatchSnapshot();
  });

  test("should accept props", () => {
    const tree = renderTree(<Brand width="200px" />);
    expect(tree).toMatchSnapshot();
  });
});
