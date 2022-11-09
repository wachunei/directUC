export default {
  id: "canvas",
  name: "Canvas",
  display: "Canvas",
  description: "",
  omnibox: ["canvas"],
  action: "login",
  redirect: (username, password, options) => {
    if (options.redirect) {
      switch (options.redirection) {
        case "portfolios": {
          return "https://cursos.canvas.uc.cl/dashboard/eportfolios";
        }
        case "courses":
        default: {
          return "https://cursos.canvas.uc.cl/courses";
        }
      }
    } else {
      return "https://cursos.canvas.uc.cl/";
    }
  },
  login: {
    depends: ["ssocas"],
    action: () => {},
  },
  options: {
    redirect: {
      type: "checkbox",
      label: "Redirigir",
      default: false,
    },
    redirection: {
      depends: (options) => options.redirect,
      type: "select",
      label: "Redirigir a",
      default: "courses",
      values: [
        ["courses", "Todos los cursos"],
        ["portfolios", "Portafolios electrónicos"],
      ],
    },
  },
};
