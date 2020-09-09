import ReactGA from "react-ga";

const trackingId =
  process.env.NODE_ENV === "development" ? "UA-177532719-1" : "UA-62971405-1";

ReactGA.initialize(trackingId, {
  titleCase: false,
});

ReactGA.ga("set", "checkProtocolTask", null);

export default {
  track(action, options) {
    ReactGA.event({ action, ...options });
  },
  page() {
    ReactGA.pageview(window.location.pathname);
  },
  identify() {},
  reset() {},
};
