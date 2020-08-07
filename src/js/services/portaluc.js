export default {
  id: "portaluc",
  name: "Portal UC",
  description: "",
  display: "Portal UC",
  omnibox: ["portal", "mi portal"],
  action: "login",
  redirect: "https://portal.uc.cl/",
  login: {
    depends: ["ssocas"],
    action: () => {},
  },
};
