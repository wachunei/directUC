export default {
  id: "biblioteca",
  name: "Biblioteca",
  description: "",
  display: "Biblioteca",
  omnibox: ["biblioteca"],
  action: "login",
  redirect:
    "http://bibliotecas.uc.cl/index.php?option=com_externallogin&view=server&server=1&redirect=101",
  login: {
    depends: ["ssocas"],
    action: () => {},
  },
  options: {
    display: false,
  },
};
