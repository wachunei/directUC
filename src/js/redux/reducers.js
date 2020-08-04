import { combineReducers } from "redux";

import user from "./user";
import options from "./options";
import services from "./services";

export default combineReducers({ user, options, services });
