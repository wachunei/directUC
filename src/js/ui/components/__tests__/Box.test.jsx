import React from "react";
import Box from "../Box";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Brand Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<Box />);
    expect(tree).toMatchSnapshot();
  });

  test("should match snapshot with light theme", () => {
    const tree = renderTree(<Box />, "lightTheme");
    expect(tree).toMatchSnapshot();
  });

  test("should match snapshot with dark theme", () => {
    const tree = renderTree(<Box />, "darkTheme");
    expect(tree).toMatchSnapshot();
  });

  test("should match with props horizontal", () => {
    const tree = renderTree(<Box horizontal />);
    expect(tree).toMatchSnapshot();
  });
  test("should match with props horizontal top", () => {
    const tree = renderTree(<Box horizontal top />);
    expect(tree).toMatchSnapshot();
  });
  test("should match with props horizontal middle", () => {
    const tree = renderTree(<Box horizontal middle />);
    expect(tree).toMatchSnapshot();
  });
  test("should match with props horizontal bottom", () => {
    const tree = renderTree(<Box horizontal bottom />);
    expect(tree).toMatchSnapshot();
  });
  test("should match with props horizontal start", () => {
    const tree = renderTree(<Box horizontal start />);
    expect(tree).toMatchSnapshot();
  });
  test("should match with props horizontal between", () => {
    const tree = renderTree(<Box horizontal between />);
    expect(tree).toMatchSnapshot();
  });
  test("should match with props horizontal around", () => {
    const tree = renderTree(<Box horizontal around />);
    expect(tree).toMatchSnapshot();
  });
  test("should match with props horizontal end", () => {
    const tree = renderTree(<Box horizontal end />);
    expect(tree).toMatchSnapshot();
  });
  test("should match with props start", () => {
    const tree = renderTree(<Box start />);
    expect(tree).toMatchSnapshot();
  });
  test("should match with props center", () => {
    const tree = renderTree(<Box center />);
    expect(tree).toMatchSnapshot();
  });
  test("should match with props end", () => {
    const tree = renderTree(<Box end />);
    expect(tree).toMatchSnapshot();
  });
});
