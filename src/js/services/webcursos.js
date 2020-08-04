export default {
  id: "webcursos",
  name: "Webcursos UC",
  display: "Webcursos",
  description: "Webcursos UC",

  action: "login",
  redirect: "http://webcurso.uc.cl/portal",

  login: (username, password) => {
    const body = new URLSearchParams();
    body.append("_username", username);
    body.append("_password", password);

    return fetch("http://webcurso.uc.cl/direct/session", {
      method: "POST",
      body: body.toString(),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
  },
  currentUser: async () => {
    const res = await fetch("http://webcurso.uc.cl/direct/user/current.json", {
      cache: "no-cache",
    });
    return res.json();
  },
  options: {
    display: false,
  },
};
