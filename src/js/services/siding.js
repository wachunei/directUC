export default {
  id: "siding",
  name: "SIDING",
  description: "Siding UC",

  display: "SIDING",
  omnibox: ["siding", "ing"],
  action: "login",

  redirect: (username, password, options) => {
    const { redirectToCourses } = options;
    return redirectToCourses
      ? "https://intrawww.ing.puc.cl/siding/dirdes/ingcursos/cursos/vista.phtml"
      : "https://intrawww.ing.puc.cl/siding/index.phtml";
  },

  login: async (username, password, options) => {
    const { customCredentials, customUser, customPassword } = options;
    const body = new URLSearchParams();

    body.append("login", customCredentials ? customUser || username : username);
    body.append(
      "passwd",
      customCredentials ? customPassword || password : password
    );

    let attemps = 0;

    const login = async () => {
      attemps += 1;
      const response = await (
        await fetch("https://intrawww.ing.puc.cl/siding/index.phtml", {
          method: "POST",
          body: body.toString(),
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
      ).text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(response, "text/html");
      if (doc.querySelector("noscript") !== null) {
        if (attemps < 5) {
          await login();
        } else {
          throw Error("SIDING Service: Too many failed attemps");
        }
      }
      if (response.includes("Datos de ingreso incorrectos.")) {
        throw Error("Datos de ingreso incorrectos.");
      }
    };

    await login();
  },
  options: {
    display: false,
    redirectToCourses: {
      type: "checkbox",
      label: "Redirigir a Ing. cursos",
      default: false,
    },
    customCredentials: {
      type: "checkbox",
      label: "Usar credenciales diferentes",
      default: false,
    },
    customUser: {
      type: "text",
      depends: (options) => options.customCredentials,
      label: "Usuario",
      caption: "Dejar en blanco para usar tu usuario original",
      default: "",
    },
    customPassword: {
      type: "password",
      depends: (options) => options.customCredentials,
      label: "Contraseña",
      caption: "Dejar en blanco para usar tu contraseña original",
      default: "",
    },
  },
};
