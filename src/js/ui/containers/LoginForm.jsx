import React from "react";
import { useDispatch } from "react-redux";

import useForm from "../../hooks/useForm";
import { removeSuffix } from "../../utils";

const initialFormState = {
  username: "",
  password: "",
};

function LoginForm() {
  const dispatch = useDispatch();
  const { values, onChange, setValue } = useForm(initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch({
        type: "login",
        payload: { username: values.username, password: values.password },
      });
      // eslint-disable-next-line no-empty
    } catch {}
  };

  const handleUsernameBlur = (e) => {
    const {
      target: { value },
    } = e;
    setValue("username", removeSuffix("@uc.cl", value));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={values.username}
        onChange={onChange}
        onBlur={handleUsernameBlur}
        required
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={onChange}
        required
      />
      <button type="submit">Guardar Usuario</button>
    </form>
  );
}

export default LoginForm;
