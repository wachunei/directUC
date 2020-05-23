(function() {
	'use strict';

	var user;
	var pass;
	var redirect;

	chrome.runtime.sendMessage('getData', function(response) {
		if(response.user !== null) {
			user = response.user;
			pass = response.pass;
			redirect = response.redirect;
			showLoginBar();
			addClickListener();
		}
	});


	function showLoginBar() {
		document.querySelector('head').insertAdjacentHTML('beforeend', '<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">');
		document.querySelector('body').insertAdjacentHTML('afterbegin', '<div style="display:none;" class="directuc-bar">Ingresar como <span class="user">'+user+ '</span></div>');
		document.querySelector('.directuc-bar').style.display = 'block';
		if(redirect === true) {
			chrome.runtime.sendMessage('deleteRedirect', function(response){});
			document.querySelector('#username').value = user;
			document.querySelector('#password').value = pass;
			document.querySelector('[type=submit]').click();
		}
	}

	function addClickListener() {
		document.querySelector('.directuc-bar').addEventListener('click', function(e) {
			e.preventDefault();

			document.querySelector('#username').value = user;
			document.querySelector('#password').value = pass;
			document.querySelector('[type=submit]').click();

		});
	}
})();
