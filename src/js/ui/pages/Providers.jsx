import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Store } from "webext-redux";

import { ThemeProvider } from "styled-components";
import theme from "../theme";

const Providers = ({ store, children }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </Provider>
);

Providers.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired,
  children: PropTypes.node.isRequired,
};

export default Providers;
