import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Store } from "webext-redux";
import { AnalyticsProvider } from "use-analytics";
import ColorSchemeThemeProvider from "./ColorSchemeThemeProvider";
import analytics from "../../../analytics";

const Providers = ({ store, children }) => (
  <Provider store={store}>
    <AnalyticsProvider instance={analytics}>
      <ColorSchemeThemeProvider>{children}</ColorSchemeThemeProvider>
    </AnalyticsProvider>
  </Provider>
);

Providers.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired,
  children: PropTypes.node.isRequired,
};

export default Providers;
