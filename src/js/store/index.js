import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { localStorage } from "redux-persist-webextension-storage";
import { alias } from "webext-redux";
import { logger } from "redux-logger";
import ReduxThunk from "redux-thunk";
import autoMergeLevel3 from "./autoMergeLevel3";

import reducers from "../redux/reducers";

const middlewares = [ReduxThunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const persistConfig = {
  key: "localStorage",
  storage: localStorage,
  stateReconciler: autoMergeLevel3,
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
