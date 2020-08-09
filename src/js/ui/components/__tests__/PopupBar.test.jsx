import React from "react";
import PopupBar from "../PopupBar";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("PopupBar Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<PopupBar />);
    expect(tree).toMatchSnapshot();
  });
});
