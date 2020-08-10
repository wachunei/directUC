import React from "react";
import Service from "../Service";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Service Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<Service />);
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const tree = renderTree(<Service />, "lightTheme");
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const tree = renderTree(<Service />, "darkTheme");
    expect(tree).toMatchSnapshot();
  });
});
