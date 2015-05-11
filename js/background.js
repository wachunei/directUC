'use strict';

/* Message Listeners */

chrome.runtime.onMessage.addListener(
  function(request, sender, callback) {
    if (request == 'getData') {
      callback({
        user: user(),
        pass: pass(),
        redirect: localStorage.getItem('mailuc-redirect')
      });
    } else if (request == 'deleteRedirect') {
      localStorage.removeItem('mailuc-redirect');
    } else if (request.action == 'login') {
      directUC.login(user(), pass(), request.service, false, callback);
    }
  });

/* User data and preferences */

var user = function() {
  return localStorage.getItem('user');
}
var pass = function() {
  return localStorage.getItem('pass');
}
var userFullName = function() {
  return localStorage.getItem('user-fullname');
}
var remembered = function() {
  return (user() !== null);
}

var optionSameTab = function() {
  return localStorage.getItem('option-sametab') || 0;
}
var optionSingleMode = function() {
  return localStorage.getItem('option-single-mode') || 0;
}
var optionSingleModeService = function() {
  return localStorage.getItem('option-single-mode-service') || 'portal';
}

var activateSiding = function() {
  return localStorage.getItem('activate-siding');
}
var optionSidingCursos = function() {
  return localStorage.getItem('option-siding-cursos');
}
var optionSidingLogin = function() {
  return localStorage.getItem('option-siding-login');
}
var optionSidingLoginUser = function() {
  return localStorage.getItem('option-siding-login-user');
}
var optionSidingLoginPass = function() {
  return localStorage.getItem('option-siding-login-pass');
}

var activateLabmat = function() {
  return localStorage.getItem('activate-labmat');
}
var optionLabmatDomain = function() {
  return localStorage.getItem('option-labmat-dominio');
}

var activateAleph = function() {
  return localStorage.getItem('activate-aleph');
}
var optionAlephProfile = function() {
  return localStorage.getItem('option-aleph-profile');
}

var activatePortal = function() {
  return localStorage.getItem('activate-portal') ||  1;
}
var activateWebcursos = function() {
  return localStorage.getItem('activate-webcursos') || 1;
}
var activateMailUC = function() {
  return localStorage.getItem('activate-mailuc') || 1;
}

/* directUC object */

var directUC = (function() {

  /* Module variables */
  var directUC = {};
  var self = directUC;

  /* Services names across object
    SIDING: siding
    Web Cursos UC: webcursos
    Portal UC: portal
    SIBUC: aleph
    Labmat: labmat
  */
  self.services = {
    'siding': 'siding',
    'webcursos': 'webcursos',
    'portal': 'portal',
    'aleph': 'aleph',
    'labmat': 'labmat',
    'mailuc': 'mailuc'
  }

  /* Various strings */
  self.strings = {
    'labmatdomain': '@mat.puc.cl',
    'ucdomain': '@uc.cl'
  }


  /* URLS Functions */
  self.urls = {}

  self.urls[self.services.siding] = function() {
    return 'https://intrawww.ing.puc.cl/siding/index.phtml'
  }

  self.urls[self.services.webcursos] = function() {
    return 'http://webcurso.uc.cl/direct/session';
  }

  self.urls[self.services.portal] = function() {
    return 'https://sso.uc.cl/cas/login?service=https%3A%2F%2Fportal.uc.cl%2Fc%2Fportal%2Flogin';
  }

  self.urls[self.services.aleph] = function() {
    var url;
    var req = new XMLHttpRequest();
    req.open('GET', 'http://aleph.uc.cl/F', false);
    req.onload = function() {
      if (req.status >= 200 && req.status < 400) {
        var parser = new DOMParser();
        var responseDom = parser.parseFromString(req.responseText, 'text/html');
        url = responseDom.querySelectorAll('form')[0].getAttribute('action');
      }
    };
    req.send();
    return url;
  }

  self.urls[self.services.labmat] = function() {
    return 'http://labmat.puc.cl/index.php';
  }

  /* Object Functions
   * This element is sent as data when making a request to the service.
   * */
  self.dataObjects = {}

  self.dataObjects[self.services.siding] = function(user, pass, callback) {
    var data_user = (optionSidingLogin() == true && optionSidingLoginUser() != null) ? optionSidingLoginUser() : user;
    var data_pass = (optionSidingLogin() == true && optionSidingLoginPass() != null) ? optionSidingLoginPass() : pass;
    callback({
      'login': data_user,
      'passwd': data_pass
    });
  }

  self.dataObjects[self.services.webcursos] = function(user, pass, callback) {
    callback({
      '_username': user,
      '_password': pass
    });
  }

  self.dataObjects[self.services.portal] = function(user, pass, callback) {
    var execution, lt, dataObj;
    var req = new XMLHttpRequest();
    req.open('GET', self.redirectUrls[self.services.portal](), true);
    req.onload = function() {
      if (req.status >= 200 && req.status < 400) {
        var parser = new DOMParser();
        var responseDom = parser.parseFromString(req.responseText, 'text/html');
        if (responseDom.querySelectorAll('input[name=execution]').length > 0) {
          execution = responseDom.querySelectorAll('input[name=execution]')[0].getAttribute('value');
          lt = responseDom.querySelectorAll('input[name=lt]')[0].getAttribute('value');
          dataObj = {
            'username': user,
            'password': pass,
            'lt': lt,
            'execution': execution,
            '_eventId': 'submit',
            'submit': 'Iniciar Sesión'
          };
        } else {
          dataObj = {};
        }
        callback(dataObj);
      }
    }
    req.send();
  }

  self.dataObjects[self.services.aleph] = function(user, pass, callback) {
    callback({
      'func': 'login-session',
      'login_source': 'LOGIN-BOR',
      'bor_id': user,
      'bor_verification': pass
    });
  }

  self.dataObjects[self.services.labmat] = function(user, pass, callback) {
    var domain = (optionLabmatDomain() == true) ? self.strings.labmatdomain : self.strings.ucdomain;
    callback({
      'accion': 'ingreso',
      'usuario': user + domain,
      'clave': pass
    });
  }

  /* Redirections URLs */

  self.redirectUrls = {}

  self.redirectUrls[self.services.siding] = function() {
    var redirectUrl = null;
    if (optionSidingCursos() == true) {
      redirectUrl = 'https://intrawww.ing.puc.cl/siding/dirdes/ingcursos/cursos/vista.phtml';
    }

    return redirectUrl ||  self.urls[self.services.siding]();
  }

  self.redirectUrls[self.services.webcursos] = function() {
    return 'http://webcurso.uc.cl/portal'
  }

  self.redirectUrls[self.services.portal] = function() {
    return 'https://portal.uc.cl';
  }

  self.redirectUrls[self.services.aleph] = function() {
    if (optionAlephProfile() == true) {
      return "http://aleph.uc.cl/F/?func=bor-info";
    } else {
      return "http://aleph.uc.cl/";
    }
  }

  self.redirectUrls[self.services.labmat] = function() {
    return self.urls[self.services.labmat]();
  }


  /* Form URL */
  self.formURL = function(serviceName) {
    return self.urls[serviceName]();
  }

  /* Form object */
  self.formObject = function(user, pass, serviceName, callback) {
    self.dataObjects[serviceName](user, pass, callback);
  }

  /* Form Redirect */
  self.formRedirect = function(serviceName) {
    return self.redirectUrls[serviceName]();
  }

  self.redirect = function(redirect, callback) {
    callback();
    if (optionSameTab() == true) {
      chrome.tabs.update({
        'url': redirect
      });
    } else {
      chrome.tabs.create({
        'url': redirect
      });
    }

  }

  self.login = function(user, pass, service, noredirect, callback) {
    if (service == self.services.mailuc) {
      self.openMail(user, pass);
      return;
    }

    var req = new XMLHttpRequest();
    var url = self.formURL(service);
    self.formObject(user, pass, service, function(dataObj) {
      var data = Object.keys(dataObj).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(dataObj[key]);
      }).join('&');
      var alephRedirect = (optionAlephProfile() == true) ? '?func=bor-info' : '?func=find-e-0';
      var redirect = (service == self.services.aleph) ? url + alephRedirect : self.formRedirect(service);
      if (data.length == 0) {
        return self.redirect(redirect);
      }
      req.open('POST', url, false);
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status >= 200) {
          if (noredirect) {
            callback(req.status);
          } else {
            self.redirect(redirect, callback);
          }

        }
      }
      try {
        req.send(data);
      } catch (err) {
        console.error(err);
      }
    });
  }

  self.openMail = function(user, pass) {

    var url = 'http://webaccess.uc.cl';
    localStorage.setItem('mailuc-redirect', 1);

    if (optionSameTab == true) {
      chrome.tabs.update({
        'url': url
      });
    } else {
      chrome.tabs.create({
        'url': url
      });
    }
  }

  return directUC;
})();
