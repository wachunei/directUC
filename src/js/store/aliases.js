import { servicesActions } from "../redux/services";

const serviceActionsHandler = (handler) =>
  Object.keys(servicesActions).reduce((acc, key) => {
    acc[servicesActions[key].callAction] = (...params) =>
      handler(key, ...params);
    return acc;
  }, {});

export default serviceActionsHandler;
