export default {
  name: "Example Service",
  id: "example",
  description: "Example service used by directUC",
  display: "Example",
  action: "login",
  login: async (username, password, options) => {
    const { time } = options;
    await new Promise((resolve) => {
      setTimeout(() => resolve(true), time || 2000);
    });
    // eslint-disable-next-line no-console
    console.log(`Resolved example ${username}:${password}`);
  },
  options: {
    time: {
      type: "Integer",
      default: 3000,
    },
  },
};
