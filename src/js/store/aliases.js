import { actions } from "../redux/services";

const serviceActionsHandler = (action, handler) =>
  Object.keys(actions).reduce((acc, key) => {
    acc[actions[key][action]] = (reduxAction) => (dispatch, getState) =>
      handler(key, reduxAction, { dispatch, getState });
    return acc;
  }, {});

export default serviceActionsHandler;
