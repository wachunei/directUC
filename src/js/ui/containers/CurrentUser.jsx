import React from "react";
import { useDispatch, useSelector } from "react-redux";

function CurrentUser() {
  const dispatch = useDispatch();
  const { username, fullName } = useSelector((state) => state.user);
  const handleLogOut = () => dispatch({ type: "logout" });

  return (
    <>
      username: {username} fullName: {fullName}
      <button type="button" onClick={handleLogOut}>
        Olvidar Usuario
      </button>
    </>
  );
}

export default CurrentUser;
