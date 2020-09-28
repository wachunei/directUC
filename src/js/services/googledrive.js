export default {
  id: "googledrive",
  name: "Google Drive UC",
  description: "",
  display: "Google Drive UC",
  omnibox: ["drive", "gdrive"],
  action: "login",
  redirect: (username) =>
    `https://drive.google.com/a/uc.cl?Email=${username}@uc.cl`,
  login: {
    depends: ["ssocas"],
    action: () => {},
  },
  options: {
    display: false,
  },
};
