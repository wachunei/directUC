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
  currentUserName: {
    depends: ["ssocas#login"],
    action: async () => {
      const loginEndpoint = "https://sso.uc.cl/cas/login";

      const websiteText = await (await fetch(loginEndpoint)).text();
      const doc = new DOMParser().parseFromString(websiteText, "text/html");
      const tableRows = doc.querySelectorAll(
        "#divPrincipalAttributes table tr"
      );

      if (!tableRows || tableRows.length === 0) {
        throw new Error("Attribute rows not found");
      }

      const [row] = Array.from(tableRows).filter((tr) => {
        const span = tr.querySelector(":scope > td code kbd");
        return span?.innerText === "displayName";
      });

      if (!row) {
        throw new Error("Attribute row for displayName not found");
      }

      const displayNameSpan = row.querySelector(
        ":scope td:is(:last-child) code kbd"
      );

      const name = displayNameSpan?.innerText.slice(1, -1);
      if (!name) {
        throw new Error("Attribute name not found");
      }
      return name;
    },
  },
};
