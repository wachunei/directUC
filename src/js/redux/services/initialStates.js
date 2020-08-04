export const DEFAULT_OPTIONS = {
  display: true,
};

const getDefaultValue = (type) => {
  switch (type) {
    case "text": {
      return "";
    }
    case "checkbox": {
      return false;
    }
    case "number": {
      return 0;
    }
    default: {
      return null;
    }
  }
};

export const createServiceOptionsState = ({ options }) => {
  if (options !== Object(options)) {
    return {};
  }

  const serviceOptions = {};
  Object.entries(options).forEach(([key, value]) => {
    if (key === "display") {
      serviceOptions[key] = value;
    }
    if (value) {
      serviceOptions[key] = value.default ?? getDefaultValue(value.type);
    }
  });

  return serviceOptions;
};

export const createInitialStates = (services) =>
  Object.entries(services).reduce((acc, [key, service]) => {
    acc[key] = {
      ...DEFAULT_OPTIONS,
      ...createServiceOptionsState(service),
    };
    return acc;
  }, {});

export default createInitialStates;
