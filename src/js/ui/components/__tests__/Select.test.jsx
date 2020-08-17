import React from "react";
import Select from "../Select";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Select Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<Select />);
    expect(tree).toMatchSnapshot();
  });

  test("should match snapshot with lightTheme", () => {
    const tree = renderTree(<Select />, "lightTheme");
    expect(tree).toMatchSnapshot();
  });

  test("should match snapshot with darkTheme", () => {
    const tree = renderTree(<Select />, "darkTheme");
    expect(tree).toMatchSnapshot();
  });

  test("should accept options", () => {
    const tree = renderTree(
      <Select>
        <option disabled hidden value="">
          option
        </option>
      </Select>
    );
    expect(tree).toMatchSnapshot();
  });
});
