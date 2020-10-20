import Box from "../Box";
import { render, getElement } from "./utils";

describe("Brand Component", () => {
  test("should match snapshot", () => {
    const { container } = render(<Box />);
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should match snapshot with light theme", () => {
    const { container } = render(<Box />, "lightTheme");
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should match snapshot with dark theme", () => {
    const { container } = render(<Box />, "darkTheme");
    expect(getElement(container)).toMatchSnapshot();
  });

  test("should match with props horizontal", () => {
    const { container } = render(<Box $horizontal />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match with props horizontal top", () => {
    const { container } = render(<Box $horizontal $top />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match with props horizontal middle", () => {
    const { container } = render(<Box $horizontal $middle />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match with props horizontal bottom", () => {
    const { container } = render(<Box $horizontal $bottom />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match with props horizontal start", () => {
    const { container } = render(<Box $horizontal $start />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match with props horizontal between", () => {
    const { container } = render(<Box $horizontal $between />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match with props horizontal around", () => {
    const { container } = render(<Box $horizontal $around />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match with props horizontal end", () => {
    const { container } = render(<Box $horizontal $end />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match with props start", () => {
    const { container } = render(<Box $start />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match with props center", () => {
    const { container } = render(<Box $center />);
    expect(getElement(container)).toMatchSnapshot();
  });
  test("should match with props end", () => {
    const { container } = render(<Box $end />);
    expect(getElement(container)).toMatchSnapshot();
  });
});
