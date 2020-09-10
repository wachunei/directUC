export const removeSuffix = (suffix, value) =>
  value.endsWith(suffix) ? value.slice(0, -suffix.length) : value;

export const parseDistinguishedName = (name) =>
  name.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

export const isFirefox = process.env.TARGET === "firefox";

export const trackingId =
  process.env.NODE_ENV === "development" ? "UA-177532719-1" : "UA-62971405-1";
