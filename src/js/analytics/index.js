import browser from "webextension-polyfill";
import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";

const trackingId =
  process.env.NODE_ENV === "development" ? "UA-177532719-1" : "UA-62971405-1";

const analytics = Analytics({
  app: "directUC",
  version: browser.runtime.getManifest().version,
  plugins: [
    googleAnalytics({
      trackingId,
      tasks: {
        checkProtocolTask: null,
      },
    }),
  ],
});

export default analytics;
