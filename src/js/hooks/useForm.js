import { useReducer, useCallback } from "react";

function useForm(initialState, customChange) {
  const [values, setValues] = useReducer(
    (state, value) => ({ ...state, ...value }),
    initialState
  );

  const handleCustomChange = useCallback(
    (name, value) =>
      typeof customChange === "object" &&
      typeof customChange[name] === "function"
        ? customChange[name](value)
        : value,
    [customChange]
  );

  const onChange = ({ target: { name, value, type, checked } }) => {
    setValues({
      [name]: handleCustomChange(name, type === "checkbox" ? checked : value),
    });
  };

  const setValue = (name, value) => setValues({ [name]: value });

  const resetValues = useCallback(() => setValues(initialState), [
    initialState,
  ]);

  return { values, onChange, resetValues, setValue };
}

export default useForm;
