import ReactGA from "react-ga";
import { isFirefox, trackingId, version } from "../utils";

let analytics;

if (!isFirefox) {
  analytics = ReactGA;
  analytics.initialize(trackingId, {
    titleCase: false,
  });

  analytics.ga("set", "checkProtocolTask", null);
  analytics.ga("set", "appVersion", version);
  analytics.ga("set", "appName", "directUC");
}

export default {
  track(action, options) {
    if (analytics) {
      analytics.event({ action, ...options });
    }
  },
  page() {
    if (analytics) {
      analytics.pageview(window.location.pathname);
    }
  },
  identify() {},
  reset() {},
};
