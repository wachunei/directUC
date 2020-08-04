import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../../hooks/useForm";
import { removeSuffix } from "../../../utils";

import Fieldset from "../../components/Fieldset";
import FormControl from "../../components/FormControl";
import Input from "../../components/Input";
import Button from "../../components/Button";

const NarrowForm = styled.form`
  margin: 10px auto;
  width: 280px;
  ${(props) =>
    props.loggedIn &&
    css`
      text-align: center;
    `}
`;

const CurrentUserContainer = styled.div`
  text-align: center;
`;

const CurrentUser = styled.span`
  padding: 0.3rem 0.6rem;
  color: white;
  background: ${(props) => props.theme.colors.primary};
`;

const initialFormState = {
  username: "",
  password: "",
};

function UserForm() {
  const dispatch = useDispatch();
  const { username, fullName } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const { values, onChange, setValue, resetValues } = useForm(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await dispatch({
        type: "login",
        payload: {
          username: removeSuffix("@uc.cl", values.username),
          password: values.password,
        },
      });
      resetValues();
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch({ type: "logout" });
  };

  const handleUsernameBlur = ({ target: { value } }) =>
    setValue("username", removeSuffix("@uc.cl", value));

  return (
    <>
      {username && (
        <CurrentUserContainer>
          <CurrentUser>
            {fullName} ({username})
          </CurrentUser>
        </CurrentUserContainer>
      )}
      <NarrowForm
        onSubmit={username ? handleLogOut : handleSubmit}
        loggedIn={!!username}
      >
        {!username && (
          <Fieldset disabled={loading}>
            <FormControl label="Usuario">
              <Input
                type="text"
                name="username"
                value={values.username}
                onChange={onChange}
                onBlur={handleUsernameBlur}
                block
                required
              />
            </FormControl>
            <FormControl label="Contraseña">
              <Input
                type="password"
                name="password"
                value={values.password}
                onChange={onChange}
                block
                required
              />
            </FormControl>
          </Fieldset>
        )}
        <Button
          type="submit"
          primary={!username}
          disabled={loading}
          block={!username}
        >
          {loading ? (
            "Guardando Usuario…"
          ) : (
            <>{username ? "Olvidar " : "Guardar"} Usuario</>
          )}
        </Button>
      </NarrowForm>
    </>
  );
}

export default UserForm;
