import { combineReducers } from "redux";

import user from "./user";
import services from "./services";

export default combineReducers({ user, services });
