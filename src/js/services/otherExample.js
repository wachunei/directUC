export default {
  name: "Example Service",
  id: "example",
  description: "Example service used by directUC",
  display: "Example",
  action: "login",
  login: async (username, password, options) => {
    const { amount, email } = options;
    await new Promise((resolve) => {
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log(
          `Resolved otherExample 5kms ${username}:${password} ${email}`
        );
        resolve(true);
      }, amount || 2000);
    });
  },
  options: {
    amount: {
      type: "Integer",
      default: 5000,
    },
    email: {
      type: "String",
      default: "hola@wachunei.com",
    },
  },
};
