const createServicesActions = (services) =>
  Object.keys(services).reduce((acc, key) => {
    acc[key] = {
      setOption: `servicesActions.${key}.setOption`,
      resetOption: `servicesActions.${key}.resetOption`,
      callAction: `servicesActions.${key}.callAction`,
    };
    return acc;
  }, {});

export default createServicesActions;
