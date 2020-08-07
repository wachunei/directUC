export default {
  id: "ssocas",
  name: "SSO CAS UC",
  description: "Central Authentication Service UC",
  action: "login",
  redirect: null,
  login: async (username, password) => {
    const loginEndpoint = "https://sso.uc.cl/cas/login";

    const initialForm = await (await fetch(loginEndpoint)).text();
    const doc = new DOMParser().parseFromString(initialForm, "text/html");
    const loginTicketField = doc.querySelector('input[name="execution"]');

    if (!loginTicketField) {
      return;
    }

    const body = new FormData();
    body.append("username", username);
    body.append("password", password);
    body.append("_eventId", "submit");
    body.append("execution", loginTicketField.getAttribute("value"));

    await fetch(loginEndpoint, {
      method: "POST",
      body,
    });
  },
};
