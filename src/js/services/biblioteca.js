export default {
  id: "biblioteca",
  name: "Biblioteca",
  description: "",
  display: "Biblioteca",
  omnibox: ["biblioteca"],
  action: "login",
  redirect: "http://bibliotecas.uc.cl/",
  login: {
    depends: ["ssocas"],
    action: async () => {
      await fetch(
        "http://bibliotecas.uc.cl/index.php?option=com_externallogin&view=server&server=1&redirect=101"
      );
    },
  },
  options: {
    display: false,
  },
};
