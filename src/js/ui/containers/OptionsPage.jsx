import React from "react";
import { useSelector } from "react-redux";

import CurrentUser from "./CurrentUser";
import LoginForm from "./LoginForm";

function Options() {
  const loggedIn = useSelector((state) => state.user.username);
  return (
    <>
      <h1>Options</h1>
      {loggedIn ? <CurrentUser /> : <LoginForm />}
    </>
  );
}

export default Options;
