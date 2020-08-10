import React from "react";
import Spinner from "../Spinner";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Spinner Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<Spinner />);
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const tree = renderTree(<Spinner />, "lightTheme");
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const tree = renderTree(<Spinner />, "darkTheme");
    expect(tree).toMatchSnapshot();
  });
});
