import ColorButton from "../ColorButton";
import { render, getElement } from "./utils";

describe("Button Component", () => {
  test("default should match snapshot", () => {
    const { container } = render(
      <ColorButton
        type="button"
        name="primaryColor"
        value="blue"
        label="Azul"
        emoji="🔵"
        onClick={jest.fn}
        selected
        disabled={false}
      />
    );
    expect(getElement(container)).toMatchSnapshot();
  });
});
