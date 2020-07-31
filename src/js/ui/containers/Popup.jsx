import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Notifications from "../../notifications";

const Popup = ({ username, services }) => {
  useEffect(async () => {
    if (!username) {
      await Notifications.createLoggedOut();
      window.close();
    }
  }, [username]);

  if (!username) {
    return null;
  }

  return (
    <>
      <h1>username: {username}</h1>
      <h2>services: {services}</h2>
    </>
  );
};

Popup.propTypes = {
  username: PropTypes.string.isRequired,
  services: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user, services }) => ({
  username: user.username,
  services: Object.keys(services).join(", "),
});

export default connect(mapStateToProps)(Popup);
