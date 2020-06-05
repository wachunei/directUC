import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Popup = ({ username, services }) => (
  <>
    <h1>username: {username}</h1>
    <h2>services: {services}</h2>
  </>
);

Popup.propTypes = {
  username: PropTypes.string.isRequired,
  services: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user, services }) => ({
  username: user.username,
  services: Object.keys(services).join(", "),
});

export default connect(mapStateToProps)(Popup);
