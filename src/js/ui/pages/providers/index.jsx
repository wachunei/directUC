import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Store } from "webext-redux";
import ColorSchemeThemeProvider from "./ColorSchemeThemeProvider";

const Providers = ({ store, children }) => (
  <Provider store={store}>
    <ColorSchemeThemeProvider>{children}</ColorSchemeThemeProvider>
  </Provider>
);

Providers.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired,
  children: PropTypes.node.isRequired,
};

export default Providers;
