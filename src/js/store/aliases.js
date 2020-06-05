import { actions } from "../redux/services";

const serviceActionsHandler = (handler) =>
  Object.keys(actions).reduce((acc, key) => {
    acc[actions[key].callAction] = (...params) => handler(key, ...params);
    return acc;
  }, {});

export default serviceActionsHandler;
