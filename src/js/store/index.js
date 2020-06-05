import { createStore, compose, applyMiddleware } from "redux";
import { alias } from "webext-redux";
import ReduxThunk from "redux-thunk";
import { logger } from "redux-logger";

import reducers from "../redux/reducers";

const middlewares = [ReduxThunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const configureStore = (aliases) =>
  createStore(
    reducers,
    compose(applyMiddleware(...[alias(aliases), ...middlewares]))
  );

export default configureStore;
