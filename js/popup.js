document.addEventListener('DOMContentLoaded', function() {
	'use strict';

	var bg = chrome.extension.getBackgroundPage();
	var user = bg.user();
	var pass = bg.pass();

	if(user === null) {
		chrome.notifications.create(
			{
		  	type: "basic",
		  	title: "Debes Iniciar Sesión",
		  	message: "Para usar directUC debes iniciar sesión en las opciones",
		  	iconUrl: "../i/icon_256.png"
			},
		function (notifID) {
			chrome.runtime.openOptionsPage();
			window.close();
		});

	}

	if (bg.optionSingleMode() === true ) {
		[].forEach.call(document.querySelectorAll('#content, #popup .loader'),function(item){
			item.classList.add('gone');
		});
		_gaq.push(['_trackEvent', 'Single Mode', 'clicked', bg.optionSingleModeService()]);

		chrome.runtime.sendMessage({action: 'login', service: bg.optionSingleModeService() }, function(response){
			window.close();
		});
	}

	document.querySelector('.user-logged-username').innerHTML = user;

	if(bg.activateSiding() === true) {
		var serviceSiding = bg.directUC.services.siding;
		document.querySelector('input#'+serviceSiding).style.display = 'inline-block';
		document.querySelector('label[for='+serviceSiding+']').style.display = 'inline-block';
	}

	if(bg.activateAleph() === true) {
		var serviceAleph = bg.directUC.services.aleph;
		document.querySelector('input#'+serviceAleph).style.display = 'inline-block';
		document.querySelector('label[for='+serviceAleph+']').style.display = 'inline-block';
	}

	if(bg.activateLabmat() === true) {
		var serviceLabmat = bg.directUC.services.labmat;
		document.querySelector('input#'+serviceLabmat).style.display = 'inline-block';
		document.querySelector('label[for='+serviceLabmat+']').style.display = 'inline-block';
	}


	if(bg.activatePortal() !== true) {
		var servicePortal = bg.directUC.services.portal;
		document.querySelector('input#'+servicePortal).style.display = 'none';
		document.querySelector('label[for='+servicePortal+']').style.display = 'none';
	}

	if(bg.activateWebcursos() !== true) {
		var serviceWebcursos = bg.directUC.services.webcursos;
		document.querySelector('input#'+serviceWebcursos).style.display = 'none';
		document.querySelector('label[for='+serviceWebcursos+']').style.display = 'none';
	}

	if(bg.activateMailUC() !== true) {
		var serviceMailUC = bg.directUC.services.mailuc;
		document.querySelector('input#'+serviceMailUC).style.display = 'none';
		document.querySelector('label[for='+serviceMailUC+']').style.display = 'none';
	}

	[].forEach.call(document.querySelectorAll('#content form .service-inputs label'),
		function(item) {
			item.addEventListener('click', function(e) {
				e.preventDefault();
				var label_for = item.getAttribute('for');
				_gaq.push(['_trackEvent', 'Services', 'clicked', label_for]);
				document.querySelector('input#'+label_for).checked = true;
				document.querySelector('#content form').dispatchEvent(new Event('submit'));
			});
		}
	);



	document.querySelector('#content form').addEventListener('submit', function(e) {
		e.preventDefault();
		var service;
		[].forEach.call(document.querySelectorAll('input[type=radio]'), function(item) {
			if (item.checked === true) {
					service = item.getAttribute('value');
			}
		});
		if(service) {
			[].forEach.call(document.querySelectorAll('#content, #popup .loader'),function(item){
				item.classList.add('gone');
			});
			chrome.runtime.sendMessage({action: 'login', service: service}, function() {
				window.close();
			});
		}
	});

	[].forEach.call(document.querySelectorAll('#content form .service-inputs input'),
		function(item) {
			item.addEventListener('focus', function() {
				item.checked = true;
				document.querySelector('label[for='+ item.getAttribute('id') + ']').classList.add('labelchecked');
				item.dispatchEvent(new Event('click'));
			}, true);
		}
	);

	[].forEach.call(document.querySelectorAll('#content form .service-inputs input'),
		function(item) {
			item.addEventListener('blur', function() {
				item.checked = false;
				document.querySelector('label[for='+ item.getAttribute('id') + ']').classList.remove('labelchecked');
			}, true);
		}
	);

	[].forEach.call(document.querySelectorAll('#popup .options-link, .user-logged'),
		function(item) {
			item.addEventListener('click', function (e) {
				e.preventDefault();
				_gaq.push(['_trackEvent', 'Options', 'clicked']);
				chrome.runtime.openOptionsPage();
			});
		}
	);



	document.querySelector('#popup #close').addEventListener('click', function(event) {
		_gaq.push(['_trackEvent', 'Close', 'clicked']);
		window.close();
	});
});

document.addEventListener('onkeydown', function(e){
	if(e.keyCode == 13) {
		document.querySelector('#content form').dispatchEvent(new Event('submit'));
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
