import { createStore, compose, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import reducers from "../redux/reducers";
// import { alias } from "webext-redux";

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const customAliasMiddleware = (aliases) => ({ dispatch, getState }) => (
  next
) => (action) => {
  const alias = aliases[action.type];
  if (alias) {
    return alias(action, { dispatch, getState });
  }

  return next(action);
};

const configureStore = (aliases) =>
  createStore(
    reducers,
    compose(
      applyMiddleware(...[customAliasMiddleware(aliases), ...middlewares])
    )
  );

export default configureStore;
