import Select from "../Select";
import { render, getElement } from "./utils";

describe("Select Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<Select />);
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should match snapshot with lightTheme", () => {
    const { container } = render(<Select />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should match snapshot with darkTheme", () => {
    const { container } = render(<Select />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should accept options", () => {
    const { container } = render(
      <Select>
        <option disabled hidden value="">
          option
        </option>
      </Select>
    );
    expect(getElement(container)).toMatchSnapshot();
  });
});
