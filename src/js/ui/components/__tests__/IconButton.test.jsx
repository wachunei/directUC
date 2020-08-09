import React from "react";
import IconButton from "../IconButton";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("IconButton Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<IconButton />);
    expect(tree).toMatchSnapshot();
  });
});
