export default {
  id: "labmat",
  name: "LABMAT",
  display: "LABMAT",
  description: "",
  omnibox: ["labmat", "mat"],
  action: "login",
  redirect: "https://www.labmat.puc.cl/dashboard",
  login: (username, password, options) => {
    const body = new URLSearchParams();
    body.append(
      "usuario",
      `${username}${options.useMatEmail ? "@mat.puc.cl" : "@uc.cl"}`
    );
    body.append("clave", password);
    body.append("url", "");

    return fetch("https://www.labmat.puc.cl/login/actionLogin", {
      method: "POST",
      body: body.toString(),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "x-requested-with": "XMLHttpRequest",
      },
    });
  },
  options: {
    display: false,
    useMatEmail: {
      type: "checkbox",
      label: "Usar correo @mat.puc.cl",
      default: false,
    },
  },
};
