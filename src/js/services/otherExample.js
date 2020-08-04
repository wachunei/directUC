export default {
  name: "Example Service",
  id: "otherExample",
  description: "Example service used by directUC",

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
