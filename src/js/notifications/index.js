import browser from "webextension-polyfill";
import icon256 from "../../img/icon_256.png";

class Notifications {
  /**
   * IDENTIFIERS
   * These constants are used to create and handle click on notifications
   */

  static get LOGGED_OUT() {
    return "logged_out_notification";
  }

  static get LOG_OUT() {
    return "log_out_notification";
  }

  static get LOG_IN_FAILED() {
    return "log_in_failed_notification";
  }

  static get LOG_IN_SUCCESS() {
    return "log_in_failed_notification";
  }

  /**
   * CREATORS
   * These methods display a browser notification
   */

  static create(identifier, options) {
    return browser.notifications.create(identifier, {
      type: "basic",
      iconUrl: icon256,
      ...options,
    });
  }

  static createLoggedOut() {
    Notifications.clear();
    return Notifications.create(Notifications.LOGGED_OUT, {
      title: "Debes Iniciar Sesión",
      message: "Para usar directUC haz click para iniciar sesión",
    });
  }

  static createLogOutSuccess() {
    Notifications.clear();
    return Notifications.create(Notifications.LOG_OUT, {
      title: "Hemos olvidado tus datos correctamente",
      message: "Nos da penita que te vayas :(",
    });
  }

  static createLogInFailed() {
    Notifications.clear();
    return Notifications.create(Notifications.LOG_IN_FAILED, {
      title: "Oops! No se pudo guardar tu usuario",
      message: "Verifica tus datos o conexión a internet",
    });
  }

  static createLogInSuccess(fullName) {
    Notifications.clear();
    return Notifications.create(Notifications.LOG_IN_SUCCESS, {
      title: "Sesión Iniciada",
      message: `Bienvenido ${fullName}`,
    });
  }

  /**
   * CLICK HANDLERS
   */

  static handleClick(notificationId) {
    switch (notificationId) {
      case Notifications.LOGGED_OUT: {
        return Notifications.handleLoggedOutClick();
      }
      case Notifications.LOG_OUT: {
        return Notifications.handleLogOutClick();
      }
      case Notifications.LOG_IN_FAILED: {
        return Notifications.handleLogInFailedClick();
      }
      case Notifications.LOG_IN_SUCCESS: {
        return Notifications.handleLogInSuccessClick();
      }
      default: {
        return Notifications.clear(notificationId);
      }
    }
  }

  static handleLoggedOutClick() {
    browser.runtime.openOptionsPage();
    Notifications.clear();
  }

  static handleLogOutClick() {
    Notifications.clear();
  }

  static handleLogInFailedClick() {
    Notifications.clear();
  }

  static handleLogInSuccessClick() {
    Notifications.clear();
  }

  /**
   * CLEAR NOTIFICATIONS
   */

  static clear(identifier) {
    if (identifier) {
      browser.notifications.clear(identifier);
    } else {
      Notifications.clearAll();
    }
  }

  static clearAll() {
    [
      Notifications.LOGGED_OUT,
      Notifications.LOG_OUT,
      Notifications.LOG_IN_FAILED,
      Notifications.LOG_IN_SUCCESS,
    ].forEach((id) => browser.notifications.clear(id));
  }
}

browser.notifications.onClicked.addListener(Notifications.handleClick);

export default Notifications;
