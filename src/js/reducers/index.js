import { combineReducers } from "redux";

import { reducer as user } from "./user";
import services from "./services";

export default combineReducers({ user, services });
