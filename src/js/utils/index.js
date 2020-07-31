export const removeSuffix = (suffix, value) =>
  value.endsWith(suffix) ? value.slice(0, -suffix.length) : value;

export const parseDistinguishedName = (name) =>
  name.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
