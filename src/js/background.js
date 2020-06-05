import { wrapStore } from "webext-redux";
import * as services from "./services";
import configureStore from "./store";
import { servicesActions } from "./redux/services";
import serviceActionsHandler from "./store/aliases";

/* From: https://github.com/tshaddix/webext-redux
 *
 * Sometimes you'll want to make sure the logic of your action
 * creators happen in the background script. In this case, you will
 * want to create an alias so that the alias is proxied from the UI component
 * and the action creator logic executes in the background script.
 * https://github.com/tshaddix/webext-redux#4-optional-implement-actions-whose-logic-only-happens-in-the-background-script-we-call-them-aliases
 */
const aliases = {
  /*
   * Handler for actions { type:'serviceActions.<service>.callAction', payload: ... }
   *
   * Payload is optional and should have an `action` key
   * with the custom action to execute from the service.
   * e.g.: { type: ..., payload: { action: "customServiceAction" } }
   *
   * This handler executes service's default action otherwise.
   */
  ...serviceActionsHandler(async (serviceKey, action, { getState }) => {
    // Custom service action or default
    const { action: customAction } = action.payload || {};

    // Service is grabbed from the action.type constant
    const service = services[serviceKey];

    // Service action to call
    const serviceAction = service[customAction || service.action];

    // Get current state
    const state = await getState();
    const {
      user: { username, password },
      services: servicesState,
    } = state;
    const serviceOptions = servicesState[serviceKey];

    // Services's actions are always called with arguments (username, password, serviceOptions)
    await serviceAction(username, password, serviceOptions);
  }),
};

const store = configureStore(aliases);
wrapStore(store);

if (process.env.NODE_ENV === "development") {
  store.dispatch({ type: servicesActions.example.callAction });
  global.dispatch = store.dispatch;
}
