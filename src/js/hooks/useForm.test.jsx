import { fireEvent, render } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import useForm from "./useForm";

describe("useForm hook", () => {
  test("should return correct object", () => {
    const { result } = renderHook(({ initialState }) => useForm(initialState), {
      initialProps: { initialState: {} },
    });

    expect(result.current).toHaveProperty("values");
    expect(result.current).toHaveProperty("onChange");
    expect(result.current).toHaveProperty("resetValues");
    expect(result.current).toHaveProperty("setValue");

    expect(result.current.values).toBeInstanceOf(Object);
    expect(result.current.onChange).toBeInstanceOf(Function);
    expect(result.current.resetValues).toBeInstanceOf(Function);
    expect(result.current.setValue).toBeInstanceOf(Function);
  });

  test("should return initialState", () => {
    const testInitialState = {
      aField: "aValue",
      otherField: 0,
      arrayField: [1, 2, 3],
    };
    const { result } = renderHook(({ initialState }) => useForm(initialState), {
      initialProps: { initialState: testInitialState },
    });

    expect(result.current.values).toStrictEqual(testInitialState);
  });

  test("should setValue", () => {
    const { result } = renderHook(({ initialState }) => useForm(initialState), {
      initialProps: {
        initialState: {
          array: [1, 2, 3, 4, 5],
          number: 42,
          string: "lorem ipsum",
        },
      },
    });

    act(() => {
      result.current.setValue("array", [5, 4, 3, 2, 1]);
      result.current.setValue("number", 24);
      result.current.setValue("string", "dolor sit amet");
    });
    expect(result.current.values.array).toStrictEqual([5, 4, 3, 2, 1]);
    expect(result.current.values.number).toBe(24);
    expect(result.current.values.string).toBe("dolor sit amet");
  });

  test("should handle onChange events", () => {
    const testInitialState = {
      personName: "Pedro Aste Kompen",
      isAdmin: false,
    };
    const { result } = renderHook(({ initialState }) => useForm(initialState), {
      initialProps: { initialState: testInitialState },
    });

    expect(result.current.values.personName).toBe("Pedro Aste Kompen");
    expect(result.current.values.isAdmin).toBe(false);
    expect(result.current.values.otherKey).toBe(undefined);

    act(() => {
      const { container } = render(
        <input name="personName" onChange={result.current.onChange} />
      );

      fireEvent.change(container.firstChild, {
        target: { value: "Pedro Pablo Aste Kompen" },
      });
    });

    expect(result.current.values.personName).toBe("Pedro Pablo Aste Kompen");

    act(() => {
      const { container } = render(
        <input
          type="checkbox"
          name="isAdmin"
          onChange={result.current.onChange}
        />
      );

      fireEvent.click(container.firstChild);
    });
    expect(result.current.values.isAdmin).toBe(true);

    act(() => {
      result.current.onChange({
        target: { name: "otherKey", value: "otherValues" },
      });
    });
    expect(result.current.values.otherKey).toBe("otherValues");
  });

  test("should handle customChange events", () => {
    const testInitialState = {
      personName: "Pedro Aste Kompen",
      isAdmin: true,
    };

    const customChangeFunction = {
      personName: (value) => value.toUpperCase(),
    };

    const { result } = renderHook(
      ({ initialState, customChange }) => useForm(initialState, customChange),
      {
        initialProps: {
          initialState: testInitialState,
          customChange: customChangeFunction,
        },
      }
    );

    expect(result.current.values.personName).toBe("Pedro Aste Kompen");

    act(() => {
      const { container } = render(
        <input name="personName" onChange={result.current.onChange} />
      );

      fireEvent.change(container.firstChild, {
        target: { value: "Pedro Pablo Aste Kompen" },
      });
    });

    expect(result.current.values.personName).toBe("PEDRO PABLO ASTE KOMPEN");

    act(() => {
      result.current.onChange({
        target: { name: "personName", value: "pedro aste" },
      });
    });
    expect(result.current.values.personName).toBe("PEDRO ASTE");
  });

  test("should resetValues", () => {
    const { result } = renderHook(({ initialState }) => useForm(initialState), {
      initialProps: {
        initialState: {
          array: [1, 2, 3, 4, 5],
          number: 42,
          string: "lorem ipsum",
        },
      },
    });

    act(() => {
      result.current.setValue("array", [5, 4, 3, 2, 1]);
      result.current.setValue("number", 24);
      result.current.setValue("string", "dolor sit amet");
    });

    expect(result.current.values.array).toStrictEqual([5, 4, 3, 2, 1]);
    expect(result.current.values.number).toBe(24);
    expect(result.current.values.string).toBe("dolor sit amet");

    act(() => {
      result.current.resetValues();
    });

    expect(result.current.values).toStrictEqual({
      array: [1, 2, 3, 4, 5],
      number: 42,
      string: "lorem ipsum",
    });
  });
});
