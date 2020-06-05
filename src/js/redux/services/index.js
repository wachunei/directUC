import { combineReducers } from "redux";
import * as services from "../../services";

import { createInitialStates } from "./initialStates";
import createServicesActions from "./actions";

import createServiceReducer from "./reducer";

const initialStates = createInitialStates(services);
export const actions = createServicesActions(services);

const servicesReducers = Object.keys(services).reduce((acc, key) => {
  acc[key] = createServiceReducer(initialStates[key], actions[key]);
  return acc;
}, {});

export default combineReducers(servicesReducers);
