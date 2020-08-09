import React from "react";
import Fieldset from "../Fieldset";
import { renderTree } from "./utils";
import "jest-styled-components";

describe("Fieldset Component", () => {
  test("should match snapshot", () => {
    const tree = renderTree(<Fieldset />);
    expect(tree).toMatchSnapshot();
  });
});
