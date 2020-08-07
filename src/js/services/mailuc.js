export default {
  id: "mailuc",
  name: "Correo UC",
  description: "Correo electrónico @uc.cl",
  display: "Correo UC",
  omnibox: ["mail", "correo", "correo uc"],
  action: "login",
  redirect: (username) =>
    `https://mail.google.com/a/uc.cl?Email=${username}@uc.cl`,
  login: {
    depends: ["ssocas"],
    action: async (username, password) => {
      const initialFormDocument = await (
        await fetch("https://webaccess.uc.cl/simplesaml/")
      ).text();

      const doc = new DOMParser().parseFromString(
        initialFormDocument,
        "text/html"
      );
      const authForm = doc.querySelector("#auth");
      const authToken = doc.querySelector("#fm1 #token");

      if (!(authForm && authToken)) {
        return;
      }

      const authUrl = authForm.action;
      const token = authToken.value;

      const body = new FormData();
      body.append("username", username);
      body.append("password", password);
      body.append("token", token);

      const res = await (
        await fetch(authUrl, {
          method: "POST",
          body,
          headers: { "x-requested-with": "XMLHttpRequest" },
        })
      ).json();

      // eslint-disable-next-line no-console
      console.assert(res.tipocorreo === "gmail");
    },
  },
};
