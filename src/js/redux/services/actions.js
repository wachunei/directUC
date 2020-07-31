const createServicesActions = (services) =>
  Object.keys(services).reduce((acc, key) => {
    acc[key] = {
      setOption: `servicesActions.${key}.setOption`,
      resetOption: `servicesActions.${key}.resetOption`,
      callAction: `servicesActions.${key}.callAction`,
      redirect: `servicesActions.${key}.redirect`,
      callActionAndRedirect: `servicesActions.${key}.callActionAndRedirect`,
    };
    return acc;
  }, {});

export default createServicesActions;
