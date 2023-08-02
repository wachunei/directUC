export default {
  id: "siding",
  name: "SIDING",
  description: "Siding UC",
  display: "SIDING",
  omnibox: ["siding", "ing"],
  action: "login",
  redirect: "https://intrawww.ing.puc.cl/siding/acceso/login.phtml?CAS=1",
  login: {
    depends: ["ssocas"],
    action: () => {},
  },
};
