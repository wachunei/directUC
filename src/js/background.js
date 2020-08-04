import { wrapStore } from "webext-redux";
import browser from "webextension-polyfill";
import Notifications from "./notifications";

import services from "./services";
import * as actions from "./redux/actions";
import serviceActionsHandler from "./store/aliases";
import configureStore from "./store";

import { parseDistinguishedName } from "./utils";

/* From: https://github.com/tshaddix/webext-redux
 *
 * Sometimes you'll want to make sure the logic of your action
 * creators happen in the background script. In this case, you will
 * want to create an alias so that the alias is proxied from the UI component
 * and the action creator logic executes in the background script.
 * https://github.com/tshaddix/webext-redux#4-optional-implement-actions-whose-logic-only-happens-in-the-background-script-we-call-them-aliases
 */
const aliases = {
  /** LOGIN */
  login: (action) => async (dispatch) => {
    const { payload: { username, password } = {} } = action;

    const loginResponse = await dispatch({
      type: actions.services.webcursos.callAction,
      payload: { action: "login", username, password },
    });

    if (!loginResponse.ok) {
      Notifications.createLogInFailed();
      throw new Error(`[Login Error] ${loginResponse.statusText}`);
    }

    const currentUser = await dispatch({
      type: actions.services.webcursos.callAction,
      payload: { action: "currentUser" },
    });

    const fullName = parseDistinguishedName(
      currentUser.props.distinguishedName
    );

    await dispatch({
      type: actions.user.setUser,
      payload: {
        username,
        password,
        fullName,
      },
    });

    Notifications.createLogInSuccess(fullName);
  },
  logout: () => (dispatch) => {
    dispatch({ type: "clearUser" });
    Notifications.createLogOutSuccess();
  },

  /** DIRECT MODE */
  directMode: () => async (dispatch, getState) => {
    const { options } = await getState();
    const service = options.directModeService;
    if (!service) {
      return;
    }
    await dispatch({
      type: `servicesActions.${service}.callActionAndRedirect`,
    });
  },

  /** SERVICES */

  /*
   * Handler for actions { type:'servicesActions.<serviceKey>.callAction', payload: ... }
   *
   * `payload` is optional and it can have an
   * `action` key with the custom action to
   * execute from the service, otherwise this handler
   * executes service's default action otherwise.
   * e.g.: { type: ..., payload: { action: "customServiceAction" } }
   *
   */
  ...serviceActionsHandler(
    "callAction",
    async (serviceKey, action, { getState, dispatch }) => {
      /*
       * `payload` is optional and can have a custom action
       */
      const {
        action: customAction,
        username: customUsername,
        password: customPassword,
      } = action.payload || {};

      // Service is grabbed from the action.type constant
      const service = services[serviceKey];

      // Service action to call, customAction or default.
      const serviceAction = service[customAction || service.action];

      /*
       * Get current state from redux state: username, password
       * and service options
       */
      const {
        user,
        services: { [serviceKey]: options },
      } = await getState();

      const username = customUsername ?? user.username;
      const password = customPassword ?? user.password;

      /**
       * Services actions can be:
       *
       * 1. A function
       * In this case this function will be called with
       * arguments (username, password, options)
       *
       * 2. An object
       * In this case we expect two keys: `depends` and `action`
       * - `depends` is a dependency array of strings with
       * actions from other services. The strings are "service"
       * or "service#action".
       * These dependencies will be executed in order
       *
       * - `action` is function the service action called after all dependencies
       * were fulfilled. This function will be called with
       * arguments (username, password, options)
       */
      if (typeof serviceAction === "function") {
        return serviceAction(username, password, options);
      }

      if (typeof serviceAction === "object") {
        const { depends = [] } = serviceAction;
        await depends.reduce((acc, dependency) => {
          const [dependencyService, dependencyAction] = dependency.split("#");
          return acc.then(() =>
            dispatch({
              type: actions.services[dependencyService].callAction,
              payload: { action: dependencyAction },
            })
          );
        }, Promise.resolve());
        return serviceAction.action(username, password, options);
      }

      throw new Error(
        `Service ${serviceKey} failed to execute action ${
          customAction || service.action
        }`
      );
    }
  ),
  /*
   * Handler for actions { type:'servicesActions.<serviceKey>.redirect' }
   */
  ...serviceActionsHandler(
    "redirect",
    async (serviceKey, action, { getState }) => {
      // Service is grabbed from the action.type constant
      const service = services[serviceKey];
      /*
       * Service redirection must be a URL string or a function
       * that returns a strings. This function is called with
       * arguments (username, password, options)
       */
      const serviceRedirect = service.redirect;

      /*
       * Get current state from redux state: username, password
       * and service options
       */
      const {
        user: { username, password },
        services: { [serviceKey]: serviceOptions },
      } = await getState();

      // Get current options from state
      const { options } = await getState();

      const redirectURL =
        typeof serviceRedirect === "function"
          ? await serviceRedirect(username, password, serviceOptions)
          : serviceRedirect;

      if (!redirectURL) {
        return;
      }

      if (options.sameTab) {
        const tabs = await browser.tabs.query({
          active: true,
        });
        browser.tabs.update(tabs[0].id, { url: redirectURL, active: true });
      } else {
        browser.tabs.create({
          url: redirectURL,
        });
      }
    }
  ),
  /*
   * Handler for actions { type:'servicesActions.<serviceKey>.callActionAndRedirect' }
   */
  ...serviceActionsHandler(
    "callActionAndRedirect",
    async (serviceKey, action, { dispatch }) => {
      await dispatch({ type: actions.services[serviceKey].callAction });
      await dispatch({ type: actions.services[serviceKey].redirect });
    }
  ),
};

const { store } = configureStore(aliases);
wrapStore(store);

if (process.env.NODE_ENV === "development") {
  global.dispatch = store.dispatch;
}
