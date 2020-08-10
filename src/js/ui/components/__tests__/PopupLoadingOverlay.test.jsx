import React from "react";
import PopupLoadingOverlay from "../PopupLoadingOverlay";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("PopupLoadingOverlay Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<PopupLoadingOverlay />);
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with lightTheme", () => {
    const tree = renderTree(<PopupLoadingOverlay />, "lightTheme");
    expect(tree).toMatchSnapshot();
  });
  test("should match snapshot with darkTheme", () => {
    const tree = renderTree(<PopupLoadingOverlay />, "darkTheme");
    expect(tree).toMatchSnapshot();
  });
});
