document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  /* User Variables */
  var bg = chrome.extension.getBackgroundPage();
  var remembered = function() {
    return bg.user() != null
  };
  var $rememberedUser = document.querySelector('.remembered-user');
  var $rememberedUserFullname = document.querySelector('.remembered-user-fullname');
  var $rememberedUserUsername = document.querySelector('.remembered-user .username');

  var userInput = document.querySelector('#user');
  var passInput = document.querySelector('#password');
  var $rememberButton = document.querySelector('.remember-user');

  /* Option Variables */
  var $currentUser = document.querySelector('.current-user');
  var $loginAlert = document.querySelector('.login-alert');

  var $optionSameTab = document.querySelector('#option-sametab');
  var $optionSingleMode = document.querySelector('#option-single-mode');
  var $optionSingleModeSelect = document.querySelector('#option-single-mode-select');
  var $forgetUser = document.querySelector('.forget-user');

  /* SIDING Variables */

  var $optionActivateSiding = document.querySelector('.services-options #activate-siding');
  var $optionSidingCursos = document.querySelector('.services-options #option-siding-cursos');

  var $optionSidingLogin = document.querySelector('.services-options #option-siding-login');
  var $optionSidingLoginBox = document.querySelector('#option-siding-login-box');
  var $optionSidingLoginUser = document.querySelector('#option-siding-login-user');
  var $optionSidingLoginPass = document.querySelector('#option-siding-login-pass');
  var $optionSidingLoginShowPassword = document.querySelector('#options .option-row #option-siding-login-box .option-siding-login-showpassword');

  /* Labmat Variables */
  var $optionActivateLabmat = document.querySelector('.services-options #activate-labmat');
  var $optionLabmatDomain = document.querySelector('.services-options #option-labmat-dominio');

  /* Aleph Variables */
  var $optionActivateAleph = document.querySelector('.services-options #activate-aleph');
  var $optionAlephProfile = document.querySelector('.services-options #option-aleph-profile');

  /* Other Services */
  var $optionActivatePortal = document.querySelector('.services-options #activate-portal')
  var $optionActivateWebcursos = document.querySelector('.services-options #activate-webcursos')
  var $optionActivateMailUC = document.querySelector('.services-options #activate-mailuc')

  function loadSettings() {
    if (remembered()) {
      $loginAlert.style.display = 'none';
      $forgetUser.style.display = 'inline-block';

      $rememberedUserFullname.innerHTML = bg.userFullName();
      $rememberedUserUsername.innerHTML = bg.user();
      $rememberedUser.style.display = 'inline';

      userInput.value = bg.user();
      passInput.value = bg.pass();
      userInput.style.display = 'none';
      passInput.style.display = 'none';

			userInput.disabled = true;
			passInput.disabled = true;

      $rememberButton.style.display = 'none';

      $optionSameTab.disabled = false;
      $optionSameTab.checked = (bg.optionSameTab() == true);

      $optionSingleMode.disabled = false;
      $optionSingleMode.checked = (bg.optionSingleMode() == true);
      $optionSingleModeSelect.disabled = (bg.optionSingleMode() == false);
      var single_mode_default = localStorage.getItem('option-single-mode-service') || 'portal';
      document.querySelector('#option-single-mode-select option[value=' + single_mode_default + ']').defaultSelected = true;
      localStorage.setItem('option-single-mode-service', single_mode_default);


      /* SIDING Initial State */
      $optionActivateSiding.disabled = false;
      $optionActivateSiding.checked = (bg.activateSiding() == true);
      $optionSidingCursos.disabled = (bg.activateSiding() !=  true)
      $optionSidingCursos.checked = (bg.activateSiding() == true && bg.optionSidingCursos() == true);

      $optionSidingLogin.disabled = (bg.activateSiding() != true);
      $optionSidingLogin.checked = (bg.activateSiding() == true && bg.optionSidingLogin() == true);

      if (bg.optionSidingLogin() != true) {
        $optionSidingLoginBox.classList.remove('displayedbox');
      }

      $optionSidingLoginUser.setAttribute('placeholder', bg.user());
      $optionSidingLoginPass.setAttribute('placeholder', 'sin cambiar');

      if (bg.optionSidingLoginUser() != null) {
        $optionSidingLoginUser.value = bg.optionSidingLoginUser();
      }

      if (bg.optionSidingLoginPass() != null) {
        $optionSidingLoginPass.value = bg.optionSidingLoginPass();
        $optionSidingLoginShowPassword.classList.add('active');
      }

      /* Labmat Initial State */
      $optionActivateLabmat.disabled = false;
      $optionActivateLabmat.checked = (bg.activateLabmat() == true);
      $optionLabmatDomain.disabled = (bg.activateLabmat() !=  true)
      $optionLabmatDomain.checked = (bg.activateLabmat() == true && bg.optionLabmatDomain() == true);

      /* Aleph Initial State */
      $optionActivateAleph.disabled = false;
      $optionActivateAleph.checked = (bg.activateAleph() == true);
      $optionAlephProfile.disabled = (bg.activateAleph() != true)
      $optionAlephProfile.checked = (bg.activateAleph() == true && bg.optionAlephProfile() == true);

      /* Rest of services */
      $optionActivatePortal.disabled = false;
      $optionActivatePortal.checked = (bg.activatePortal() == true);
      $optionActivateWebcursos.disabled = false;
      $optionActivateWebcursos.checked = (bg.activateWebcursos() == true);
      $optionActivateMailUC.disabled = false;
      $optionActivateMailUC.checked = (bg.activateMailUC() == true);

    } else {
      resetOptions();
    }
  }

  loadSettings();

  // Estado dinamico

  userInput.addEventListener('blur', function(e) {
    var ucSuffix = '@uc.cl';
    var index = userInput.value.indexOf(ucSuffix, userInput.value.length - ucSuffix.length);
    if(index !== -1) {
      userInput.value = userInput.value.substr(0, index);
    }
  });

	[passInput, userInput].forEach(function(item) {
		item.addEventListener('keyup', function(event) {
			if (event.keyCode == 13) {
				$rememberButton.dispatchEvent(new Event('click'));
			}
		})
	});

  $rememberButton.addEventListener('click', function(e) {
    e.preventDefault();
    if (userInput.value.length > 0 && passInput.value.length > 0) {
			$rememberButton.innerHTML = 'Autenticando...';
			bg.directUC.login(userInput.value, passInput.value, 'webcursos', true, function(status){
				console.log(status);
				if(status == 403 || status == 404) {
					chrome.notifications.create(
						{
							type: 'basic',
							title: 'Oops! No se pudo guardar tu usuario',
							message: 'Verificar tus datos y/o conexión a internet.',
							iconUrl: '../i/icon_256.png'
						},
					function (notifID) {
						$rememberButton.innerHTML = 'Guardar Usuario';
					});

				} else if(status == 201) {
			    var req = new XMLHttpRequest();
			    req.open('GET', 'http://webcurso.uc.cl/direct/user/current.json');
			    req.onload = function() {
			      if (req.status >= 200 && req.status < 400) {
			      	var response = JSON.parse(req.responseText);
							localStorage.setItem('user-fullname', response.props.distinguishedName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}));
							localStorage.setItem('user', userInput.value);
			      	localStorage.setItem('pass', passInput.value);
							chrome.notifications.create(
								{
							  	type: 'basic',
							  	title: 'Sesión Iniciada como '+bg.userFullName(),
							  	message: '',
							  	iconUrl: '../i/icon_256.png'
								},
							function (notifID) {
								loadSettings();
							});

						}
			    };
					req.send();
				}
			});
    }
  })

  $optionSidingLoginShowPassword.addEventListener('mouseover', function() {
    $optionSidingLoginPass.setAttribute('type', 'text');
  });

  $optionSidingLoginShowPassword.addEventListener('mouseleave', function() {
    $optionSidingLoginPass.setAttribute('type', 'password');
  });

  $forgetUser.addEventListener('click', function(event) {
    event.preventDefault();
    resetOptions(true);
  });

  [$optionSidingLoginUser, $optionSidingLoginPass].forEach(function(item) {
    item.addEventListener('keyup', function(e) {
      var valor = item.value;
      if (item === $optionSidingLoginUser) {
        if (valor.length > 0) {
          localStorage.setItem('option-siding-login-user', valor);
        } else {
          localStorage.removeItem('option-siding-login-user');
        }
      } else if (item === $optionSidingLoginPass) {
        if (valor.length > 0) {
          $optionSidingLoginShowPassword.classList.add('active');
          localStorage.setItem('option-siding-login-pass', valor);
        } else {
          $optionSidingLoginShowPassword.classList.remove('active');
          localStorage.removeItem('option-siding-login-pass');
        }
      }
    })
  });


  [].forEach.call(document.querySelectorAll('input[type=checkbox]'), function(item) {

    item.addEventListener('change', function(event) {

      var checkedNumber = 0;
      [].forEach.call(document.querySelectorAll('.services-options input[id^="activate"]'), function(item) {
        if (item.checked) {
          checkedNumber++;
        }
      });

      if (checkedNumber == 0) {
        event.preventDefault();
        item.checked = true;
        return;
      }

      if (item === $optionSameTab) {
        if (item.checked) {
          localStorage.setItem('option-sametab', 1);
        } else {
          localStorage.setItem('option-sametab', 0);
        }

      } else if (item === $optionSingleMode) {
        if (item.checked) {
          localStorage.setItem('option-single-mode', 1);
          $optionSingleModeSelect.removeAttribute('disabled');
          localStorage.setItem('option-single-mode-service', $optionSingleModeSelect.value);

        } else {
          localStorage.setItem('option-single-mode', 0);
          $optionSingleModeSelect.disabled = true;

        }

      } else if (item === $optionActivateSiding) {
        if (item.checked) {
          localStorage.setItem('activate-siding', 1);
          $optionSidingCursos.removeAttribute('disabled');
          $optionSidingLogin.removeAttribute('disabled');
        } else {
          localStorage.setItem('activate-siding', 0);
          localStorage.setItem('option-siding-cursos', 0);
          localStorage.setItem('option-siding-login', 0);
          $optionSidingLoginBox.classList.remove('displayedbox');
          $optionSidingCursos.disabled = true;
          $optionSidingLogin.disabled = true;
          $optionSidingCursos.checked = false;
          $optionSidingLogin.checked = false;
        }

      } else if (item === $optionSidingCursos) {
        if (item.checked) {
          localStorage.setItem('option-siding-cursos', 1);
        } else {
          localStorage.setItem('option-siding-cursos', 0);
        }
      } else if (item === $optionSidingLogin) {
        if (item.checked) {
          localStorage.setItem('option-siding-login', 1);
          $optionSidingLoginBox.classList.add('displayedbox');
        } else {
          localStorage.setItem('option-siding-login', 0);
          $optionSidingLoginBox.classList.remove('displayedbox');
        }
      } else if (item === $optionActivateLabmat) {
        if (item.checked) {
          localStorage.setItem('activate-labmat', 1);
          $optionLabmatDomain.removeAttribute('disabled');
        } else {
          localStorage.setItem('activate-labmat', 0);
          localStorage.setItem('option-labmat-dominio', 0);
          $optionLabmatDomain.disabled = true;
          $optionLabmatDomain.checked = false;
        }
      } else if (item === $optionLabmatDomain) {
        if (item.checked) {
          localStorage.setItem('option-labmat-dominio', 1);
        } else {
          localStorage.setItem('option-labmat-dominio', 0);
        }
      } else if (item === $optionActivateAleph) {
        if (item.checked) {
          localStorage.setItem('activate-aleph', 1);
          $optionAlephProfile.removeAttribute('disabled');
        } else {
          localStorage.setItem('activate-aleph', 0);
          localStorage.setItem('option-aleph-profile', 0);
          $optionAlephProfile.disabled = true;
          $optionAlephProfile.checked = false;
        }
      } else if (item === $optionAlephProfile) {
        if (item.checked) {
          localStorage.setItem('option-aleph-profile', 1);
        } else {
          localStorage.setItem('option-aleph-profile', 0);
        }
      } else if (item === $optionActivatePortal) {
        if (item.checked) {
          localStorage.setItem('activate-portal', 1);
        } else {
          localStorage.setItem('activate-portal', 0);
        }
      } else if (item === $optionActivateWebcursos) {
        if (item.checked) {
          localStorage.setItem('activate-webcursos', 1);
        } else {
          localStorage.setItem('activate-webcursos', 0);
        }
      } else if (item === $optionActivateMailUC) {
        if (item.checked) {
          localStorage.setItem('activate-mailuc', 1);
        } else {
          localStorage.setItem('activate-mailuc', 0);
        }
      }
    });
  });

  $optionSingleModeSelect.addEventListener('change', function(event) {
    localStorage.setItem('option-single-mode-service', $optionSingleModeSelect.value);
  });


  function resetOptions(frombutton) {
		if(frombutton) {
			$forgetUser.innerHTML = 'Olvidando...';

			var req = new XMLHttpRequest();
	    req.open('GET', 'http://webcurso.uc.cl/portal/logout');
	    req.onload = function() {
	      if (req.status >= 200 && req.status < 400) {
						chrome.notifications.create(
							{
								type: 'basic',
								title: 'Hemos olvidado tus datos correctamente',
								message: 'Nos da penita que te vayas :(',
								iconUrl: '../i/icon_256.png'
							}
						);
						resetLocalOptions();
				}
	    };
			req.send();
		} else {
			resetLocalOptions();
		}
  }

	function resetLocalOptions(){
		// Local Storage
		localStorage.clear();

		// Usuario
		$forgetUser.innerHTML = 'Olvidar Usuario';
		$forgetUser.style.display = 'none';
    $rememberedUser.style.display = 'none';
    $rememberedUserFullname.innerHTML = '';
    $rememberedUserUsername.innerHTML = '';
		$rememberButton.innerHTML = 'Guardar Usuario';
		$rememberButton.style.display = 'inline-block';
		userInput.value = passInput.value = '';
    userInput.style.display = passInput.style.display = 'inline-block';
		userInput.disabled = passInput.disabled = false;


		// Desactivar Servicios
		var uncheck_forms = ['#hide-form',
			'.services-options input[id*=siding]',
			'.services-options input[id*=labmat]',
			'.services-options input[id*=aleph]'
		];
		[].forEach.call(document.querySelectorAll(uncheck_forms.join(', ')), function(item) {
			item.checked = false;
		});

		$optionSidingLoginUser.value = '';
		$optionSidingLoginPass.value = '';
		$optionSidingLoginBox.classList.remove('displayedbox');
		// Activar Portal y Webcursos
		[$optionActivatePortal, $optionActivateWebcursos, $optionActivateMailUC].forEach(function(item) {
			item.checked = true;
		});

		[].forEach.call(document.querySelectorAll('.user-options input, .services-options input, .user-options select'), function(item) {
			item.disabled = true;
		});
		$loginAlert.style.display = 'block';
	}
});

/* Analytics */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-62971405-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
