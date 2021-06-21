import { wrapStore } from "webext-redux";
import browser from "webextension-polyfill";
import semver from "semver";
import Notifications from "./notifications";

import services from "./services";
import * as actions from "./redux/actions";
import serviceActionsHandler from "./store/aliases";
import configureStore from "./store";
import Omnibox from "./omnibox";
import analytics from "./analytics";
import PrideIcon from "./pride-icon";
import { parseDistinguishedName, version } from "./utils";

/** Aliases for webext-redux */
/* From: https://github.com/tshaddix/webext-redux
 *
 * Sometimes you'll want to make sure the logic of your action
 * creators happen in the background script. In this case, you will
 * want to create an alias so that the alias is proxied from the UI component
 * and the action creator logic executes in the background script.
 * https://github.com/tshaddix/webext-redux#4-optional-implement-actions-whose-logic-only-happens-in-the-background-script-we-call-them-aliases
 */
const aliases = {
  pride: () => () => {
    if (new Date().getMonth() === 5) {
      PrideIcon.animate();
    }
  },
  /** USER */
  login: (action) => async (dispatch) => {
    const { payload: { username, password } = {} } = action;

    try {
      const name = await dispatch({
        type: actions.services.ssocas.callAction,
        payload: { action: "currentUserName", username, password },
      });

      const fullName = parseDistinguishedName(name);
      await dispatch({
        type: actions.user.setUser,
        payload: {
          username,
          password,
          fullName,
        },
      });

      analytics.track("logged", {
        category: "Users",
        label: username,
      });

      Notifications.createLogInSuccess(fullName);
    } catch (error) {
      Notifications.createLogInFailed();
      throw new Error(`[Login Error] ${error?.message}`);
    }
  },
  logout: () => async (dispatch, getState) => {
    const {
      user: { username },
    } = await getState();
    dispatch({ type: actions.user.clearUser });
    Notifications.createLogOutSuccess();
    analytics.track("forget", {
      category: "Users",
      label: username,
    });
  },

  /** DIRECT MODE */
  directMode: () => async (dispatch, getState) => {
    const { options } = await getState();
    const service = options.directModeService;
    if (!service) {
      return;
    }
    analytics.track("clicked", {
      category: "Single Mode",
      label: service,
    });

    await dispatch({
      type: `servicesActions.${service}.callActionAndRedirect`,
    });
  },

  /** OMNIBOX */
  omnibox: (action) => async (dispatch) => {
    const { payload: { service, disposition } = {} } = action;

    analytics.track("clicked", {
      category: "Omnibox",
      label: service,
    });
    dispatch({ type: "pride" });
    await dispatch({
      type: `servicesActions.${service}.callActionAndRedirect`,
      payload: { disposition },
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
              payload: {
                action: dependencyAction,
                username,
                password,
              },
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
      /*
       * `payload` is optional and can have a
       * `disposition` key of type OnInputEnteredDisposition
       * when coming from omnibox. See:
       * https://developer.chrome.com/extensions/omnibox#type-OnInputEnteredDisposition
       *
       */
      const { disposition, modClick } = action.payload || {};
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

      const url =
        typeof serviceRedirect === "function"
          ? await serviceRedirect(username, password, serviceOptions)
          : serviceRedirect;

      if (!url) {
        return;
      }

      /*
       Action comes from the default click of the popup
       or from a modClick (middleclick or with meta key modifier)
      */
      if (!disposition || modClick) {
        analytics.track("clicked", {
          category: "Services",
          label: serviceKey,
        });
      }

      if (disposition) {
        switch (disposition) {
          case "newForegroundTab": {
            browser.tabs.create({ url });
            break;
          }
          case "newBackgroundTab": {
            browser.tabs.create({ url, active: false });
            break;
          }
          case "currentTab":
          default: {
            browser.tabs.update({ url });
          }
        }
      } else if (options.sameTab) {
        browser.tabs.update({ url });
      } else {
        browser.tabs.create({ url });
      }
    }
  ),
  /*
   * Handler for actions { type:'servicesActions.<serviceKey>.callActionAndRedirect' }
   */
  ...serviceActionsHandler(
    "callActionAndRedirect",
    async (serviceKey, action, { dispatch }) => {
      await dispatch({
        ...action,
        type: actions.services[serviceKey].callAction,
      });
      await dispatch({
        ...action,
        type: actions.services[serviceKey].redirect,
      });
    }
  ),
};

const { store, persistor } = configureStore(aliases);
Omnibox(services, store);
wrapStore(store);

analytics.page();

persistor.subscribe(() => {
  const { bootstrapped } = persistor.getState();
  if (bootstrapped) {
    const {
      user: { username },
    } = store.getState();
    if (username) {
      analytics.track("loaded", {
        category: "Users",
        label: username,
      });
    }
  }
});

/* Install and update listeners */
browser.runtime.onInstalled.addListener(({ reason, previousVersion }) => {
  if (reason === "install") {
    analytics.track("installed", {
      category: "Installations",
      label: version,
    });
  } else if (reason === "update") {
    // We are receiving an update

    // If the updated version is the same as the previous one do nothing
    if (semver.eq(previousVersion, version)) {
      return;
    }

    analytics.track("updated", {
      category: "Installations",
      label: version,
    });

    // If the current version is >=1.0.0
    if (semver.gte(version, "1.0.0")) {
      // If we are coming from the previous major version (0.x.x)
      // we transfer the user data into the new version storage
      // in case the user was logged in
      if (semver.satisfies(previousVersion, ">=0.0.0 <1.0.0")) {
        const username = localStorage.getItem("user");
        const password = localStorage.getItem("pass");
        const fullName = localStorage.getItem("user-fullname");

        if (username && password && fullName) {
          analytics.track("upgraded", {
            category: "Installations",
            label: `${previousVersion} > ${version}`,
          });
          store.dispatch({
            type: actions.user.setUser,
            payload: { username, password, fullName },
          });
          Notifications.create(Notifications.OPEN_OPTIONS, {
            title: "Descubre el nuevo directUC",
            message: "Haz click y actualiza tus opciones",
          });
        }
        localStorage.clear();
      }
    }
  }
});
