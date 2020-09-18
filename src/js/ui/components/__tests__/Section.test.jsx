import React from "react";
import Section from "../Section";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Section Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<Section />);
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with ghost", () => {
    const tree = renderTree(<Section ghost />);
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const tree = renderTree(<Section />, "lightTheme");
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const tree = renderTree(<Section />, "darkTheme");
    expect(tree).toMatchSnapshot();
  });
});
