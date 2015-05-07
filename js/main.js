document.addEventListener('DOMContentLoaded', function() {
	'use strict';

	var bg = chrome.extension.getBackgroundPage();
	var user = bg.user();
	var pass = bg.pass();

	if (bg.optionSingleMode() == true ) {
		[].forEach.call(document.querySelectorAll('#content, #popup .loader'),function(item){
			item.classList.add('gone');
		});
		chrome.runtime.sendMessage({action: 'login', service: bg.optionSingleModeService() });
	}

	if(bg.activateSiding() == true) {
		var service = bg.directUC.services.siding;
		document.querySelector('input#'+service).style.display = 'inline-block';
		document.querySelector('label[for='+service+']').style.display = 'inline-block';
	}

	if(bg.activateAleph() == true) {
		var service = bg.directUC.services.aleph;
		document.querySelector('input#'+service).style.display = 'inline-block';
		document.querySelector('label[for='+service+']').style.display = 'inline-block';
	}

	if(bg.activateLabmat() == true) {
		var service = bg.directUC.services.labmat;
		document.querySelector('input#labmat').style.display = 'inline-block';
		document.querySelector('label[for='+service+']').style.display = 'inline-block';
	}


	if(bg.activatePortal() != true) {
		var service = bg.directUC.services.portal;
		document.querySelector('input#'+service).style.display = 'none';
		document.querySelector('label[for='+service+']').style.display = 'none';
	}

	if(bg.activateWebcursos() != true) {
		var service = bg.directUC.services.webcursos;
		document.querySelector('input#'+service).style.display = 'none';
		document.querySelector('label[for='+service+']').style.display = 'none';
	}

	if(bg.activateMailUC() != true) {
		var service = bg.directUC.services.mailuc;
		document.querySelector('input#'+service).style.display = 'none';
		document.querySelector('label[for='+service+']').style.display = 'none';
	}

	if(user) {
		document.querySelector('#user').setAttribute('value', user);
		document.querySelector('#user').blur();
		document.querySelector('#password').setAttribute('value', pass);
		document.querySelector('#password').blur();
		document.querySelector('.service-inputs input').focus();
	}


	[].forEach.call(document.querySelectorAll('#content form .service-inputs label'),
		function(item) {
			item.addEventListener('click', function(e) {
				e.preventDefault();
				var label_for = item.getAttribute('for');
				document.querySelector('input#'+label_for).checked = true;
				document.querySelector('#content form').dispatchEvent(new Event('submit'));
			})
		}
	);



	document.querySelector('#content form').addEventListener('submit', function(e) {
		e.preventDefault();
		var user = document.querySelector('#user').getAttribute('value');
		var pass = document.querySelector('#password').getAttribute('value');
		var service;
		[].forEach.call(document.querySelectorAll('input[type=radio]'), function(item) {
			if (item.checked == true) {
					service = item.getAttribute('value')
			}
		});
		if(user && pass && service) {
			[].forEach.call(document.querySelectorAll('#content, #popup .loader'),function(item){
				item.classList.add('gone');
			});
			chrome.runtime.sendMessage({action: 'login', service: service});
			window.close();
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

	document.querySelector('#popup .options-link').addEventListener('click', function (e) {
		e.preventDefault();
		chrome.runtime.openOptionsPage();
		});



	document.querySelector('#popup #close').addEventListener('click', function(event) {
		window.close();
	});
});

	document.addEventListener('onkeydown', function(e){
		if(e.keyCode == 13) {
			document.querySelector('#content form').dispatchEvent(new Event('submit'));
		}
	});
