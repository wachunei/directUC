import { createStore, compose, applyMiddleware } from "redux";
import { alias } from "webext-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ReduxThunk from "redux-thunk";
import { logger } from "redux-logger";

import reducers from "../redux/reducers";

const middlewares = [ReduxThunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const configureStore = (aliases) => {
  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(...[alias(aliases), ...middlewares]))
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
