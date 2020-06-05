import { actions } from "../redux/services";

const serviceActionsHandler = (handler) =>
  Object.keys(actions).reduce((acc, key) => {
    acc[actions[key].callAction] = (action) => (dispatch, getState) => {
      return handler(key, action, { dispatch, getState });
    };
    return acc;
  }, {});

export default serviceActionsHandler;
