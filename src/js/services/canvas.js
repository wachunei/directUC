export default {
  id: "canvas",
  name: "Canvas",
  display: "Canvas",
  description: "",
  omnibox: ["canvas"],
  action: "login",
  redirect: (username, password, options) =>
    options.redirectToCourses
      ? "https://cursos.canvas.uc.cl/courses"
      : "https://cursos.canvas.uc.cl/",
  login: {
    depends: ["ssocas"],
    action: () => {},
  },
  options: {
    redirectToCourses: {
      type: "checkbox",
      label: "Redirigir a Todos los cursos",
      default: false,
    },
  },
};
