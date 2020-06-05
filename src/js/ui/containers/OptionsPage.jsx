import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Options = ({ username, password, dispatch }) => (
  <>
    <h1>
      Options!!
      <br />
      user: <span>{username}</span> password: <span>{password}</span>
    </h1>
    <button
      type="button"
      onClick={() =>
        dispatch({
          type: "login",
          payload: {
            username: new Date().toString(),
            password: new Date().toString(),
          },
        })
      }
    >
      {" "}
      setear user
    </button>
  </>
);

Options.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    password: state.user.password,
  };
};

export default connect(mapStateToProps)(Options);
