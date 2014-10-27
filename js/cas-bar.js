jQuery(document).ready(function() {

	jQuery.fn.exists = function(){
    	return this.length > 0 ? this : false;
	}

	var datos;
	chrome.runtime.sendMessage("getData", function(response) {
		if(response.user && response.user != "") {
			datos = response;
			mostrarMensaje();
		}
	});

	function mostrarMensaje() {
		jQuery("head").append("<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>");
		jQuery("body").prepend('<div style="display:none" class="directuc-bar">Ingresar como <span class="user">'+datos.user+ '</span></div>');
		if(datos.redirect != true) {
			jQuery(".directuc-bar").fadeIn();
		} else {
			chrome.runtime.sendMessage("deleteRedirect", function(response) {});
			jQuery("body").fadeOut();
			jQuery(".directuc-bar").click();
		}
	}

	jQuery(document).on('click', '.directuc-bar', function(e) {
		e.preventDefault();
		jQuery("#username").val(datos.user);
		jQuery("#password").val(datos.pass);
		var submit = jQuery("button[type=submit]").exists() || jQuery("input[type=submit").exists();
		console.log(submit);
		submit.click();
		jQuery("body").fadeOut();
	});

});


