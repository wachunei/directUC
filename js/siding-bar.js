jQuery(document).ready(function () {
	var datos;
	chrome.runtime.sendMessage("getData", function (response) {
		if (response.user && response.user != "") {
			datos = response;
			mostrarMensaje();
		}
	});

	function mostrarMensaje() {
		jQuery("head").append("<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>");
		jQuery("#header").prepend('<div style="display:none;" class="directuc-siding-bar">Ingresar al SIDING como <span class="user">' + datos.user + '</span></div>');
		jQuery(".directuc-siding-bar").fadeIn();
	}

	jQuery(document).on('click', '.directuc-siding-bar', function (e) {
		e.preventDefault();
		jQuery("#user-siding").val(datos.user);
		jQuery("#password-siding").val(datos.pass);
		var submit = jQuery("#form-siding input[type=submit]");
		submit.click();
		jQuery("body").fadeOut();
	});

});
