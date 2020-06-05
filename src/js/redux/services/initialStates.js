export const DEFAULT_OPTIONS = {
  display: true,
};

export const createServiceOptionsState = ({ options = {} }) => {
  if (options !== Object(options)) {
    return {};
  }

  const serviceOptions = {};
  Object.entries(options).forEach(([key, value]) => {
    if (value) {
      serviceOptions[key] = value.default;
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
