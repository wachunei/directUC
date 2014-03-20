$(document).ready(function() {
	
	// Variables
		// Usuario
	var user = localStorage.getItem("user"),
		pass = localStorage.getItem("pass"),
		remembered = (user != null),

		option_sametab = localStorage.getItem("option-sametab"),
		//hide_form = localStorage.getItem("hide-form"),



		// Servicios
		activate_siding = localStorage.getItem("activate-siding"),
		option_siding_cursos = localStorage.getItem("option-siding-cursos"),
		option_siding_login = localStorage.getItem("option-siding-login"),
		option_siding_login_user = localStorage.getItem("option-siding-login-user"),
		option_siding_login_pass = localStorage.getItem("option-siding-login-pass"),
		siding_login_user = $("#option-siding-login-user"),
		siding_login_pass = $("#option-siding-login-pass"),
		siding_login_showpass = $("#options .option-row #option-siding-login-box .option-siding-login-showpassword"),

		activate_labmat = localStorage.getItem("activate-labmat"),
		option_labmat_dominio = localStorage.getItem("option-labmat-dominio"),

		activate_aleph = localStorage.getItem("activate-aleph"),
		option_aleph_profile = localStorage.getItem("option-aleph-profile"),

		activate_portal = localStorage.getItem("activate-portal") || 1,
		activate_webcursos = localStorage.getItem("activate-webcursos") || 1,
		activate_mailuc = localStorage.getItem("activate-mailuc") || 1;

	// Estado Inicial

	if(remembered) {
		// Usuario
		$(".current-user").text(user);
		$(".login-alert").hide();

		$("#option-sametab").prop('checked', option_sametab == true);

		// $("#hide-form").attr('checked', hide_form == true);


		// Servicios
		
		// SIDING
		$(".services-options #activate-siding").prop('checked', activate_siding == true);
		$(".services-options #option-siding-cursos")
			.attr('disabled', activate_siding == false)
			.prop('checked', activate_siding == true && option_siding_cursos == true);
		$(".services-options #option-siding-login")
			.attr('disabled', activate_siding == false)
			.prop('checked', activate_siding == true && option_siding_login == true);

		if (option_siding_login != true) {
			$("#option-siding-login-box").hide();
		}

		$("#option-siding-login-user").attr('placeholder', user);
		$("#option-siding-login-pass").attr('placeholder', "sin cambiar");


		if (option_siding_login_user) {
			siding_login_user.val(option_siding_login_user);
		}

		if (option_siding_login_pass) {
			siding_login_pass.val(option_siding_login_pass);
			siding_login_showpass.addClass('active');

		}

		$(".services-options #activate-labmat").prop('checked', activate_labmat == true);
		$(".services-options #option-labmat-dominio")
			.attr('disabled', activate_labmat == false)
			.prop('checked', activate_labmat == true && option_labmat_dominio == true);

		$(".services-options #activate-aleph").prop('checked', activate_aleph == true);
		$(".services-options #option-aleph-profile")
			.attr('disabled', activate_aleph == false)
			.prop('checked', activate_aleph == true && option_aleph_profile == true);
		
		$(".services-options #activate-portal").prop('checked', activate_portal == true);
		$(".services-options #activate-webcursos").prop('checked', activate_webcursos == true);
		$(".services-options #activate-mailuc").prop('checked', activate_mailuc == true);




	} else {
		resetOptions();
	}

	// Estado dinamico

	siding_login_showpass.hover(function() {
		$("#option-siding-login-pass").attr('type', 'text');
	}, function() {
		$("#option-siding-login-pass").attr('type', 'password');
	});

	$(".forget-user").click(function(event) {
		resetOptions();
	});

	$.each([siding_login_user, siding_login_pass], function(index, el) {
		$(this).keyup(function(event) {
			var valor = $(this).val();
			if($(this).is(siding_login_user)) {
				if (valor.length > 0) {
					localStorage.setItem("option-siding-login-user", valor);
				} else {
					localStorage.removeItem("option-siding-login-user");
				}
			} else if ($(this).is(siding_login_pass)) {
				if (valor.length > 0) {
					siding_login_showpass.addClass('active');
					localStorage.setItem("option-siding-login-pass", valor);
				} else {
					siding_login_showpass.removeClass('active');
					localStorage.removeItem("option-siding-login-pass");
				}
			}
		});
	});

	$("input[type=checkbox]").change(function(event) {

		if( $('.services-options input[id^="activate"]:checked').length == 0) {
			event.preventDefault();
			$(this).prop('checked', true);
			return;
		}

		/*
		 if ($(this).is("#hide-form")) {
			if($(this).is(":checked")) {
				localStorage.setItem("hide-form", 1);
			} else {
				localStorage.setItem("hide-form", 0);
			}
		} else */

		if ($(this).is("#option-sametab")) {
			if($(this).is(":checked")) {
				localStorage.setItem("option-sametab", 1);
			} else {
				localStorage.setItem("option-sametab", 0);
			}
		} else if($(this).is("#activate-siding")) {
			if($(this).is(":checked")) {
				localStorage.setItem("activate-siding", 1);
				$("#option-siding-cursos, #option-siding-login").removeAttr("disabled");
			} else {
				localStorage.setItem("activate-siding", 0);
				localStorage.setItem("option-siding-cursos", 0);
				localStorage.setItem("option-siding-login", 0);
				$("#option-siding-login-box").slideUp(200);
				$("#option-siding-cursos, #option-siding-login").attr("disabled","disabled").prop('checked', false);
			}

		} else if ($(this).is("#option-siding-cursos")) {
			if($(this).is(":checked")) {
				localStorage.setItem("option-siding-cursos", 1);
			} else {
				localStorage.setItem("option-siding-cursos", 0);
			}
		} else if ($(this).is("#option-siding-login")) {
			if($(this).is(":checked")) {
				localStorage.setItem("option-siding-login", 1);
				$("#option-siding-login-box").slideDown(200);
			} else {
				localStorage.setItem("option-siding-login", 0);
				$("#option-siding-login-box").slideUp(200);
			}
		} else if ($(this).is("#activate-labmat")) {
			if($(this).is(":checked")) {
				localStorage.setItem("activate-labmat", 1);
				$("#option-labmat-dominio").removeAttr("disabled");

			} else {
				localStorage.setItem("activate-labmat", 0);
				localStorage.setItem("option-labmat-dominio", 0);

				$("#option-labmat-dominio").attr("disabled","disabled").prop('checked', false);
			}
		} else if ($(this).is("#option-labmat-dominio")){
			if($(this).is(":checked")) {
				localStorage.setItem("option-labmat-dominio", 1);
			} else {
				localStorage.setItem("option-labmat-dominio", 0);
			}
		} else if ($(this).is("#activate-aleph")) {
			if($(this).is(":checked")) {
				localStorage.setItem("activate-aleph", 1);
				$("#option-aleph-profile").removeAttr("disabled");

			} else {
				localStorage.setItem("activate-aleph", 0);
				localStorage.setItem("option-aleph-profile", 0);

				$("#option-aleph-profile").attr("disabled","disabled").prop('checked', false);
			}
		} else if ($(this).is("#option-aleph-profile")){
			if($(this).is(":checked")) {
				localStorage.setItem("option-aleph-profile", 1);
			} else {
				localStorage.setItem("option-aleph-profile", 0);
			}
		} else if ($(this).is("#activate-portal")) {
			if($(this).is(":checked")) {
				localStorage.setItem("activate-portal", 1);
			} else {
				localStorage.setItem("activate-portal", 0);
			}
		} else if ($(this).is("#activate-webcursos")) {
			if($(this).is(":checked")) {
				localStorage.setItem("activate-webcursos", 1);
			} else {
				localStorage.setItem("activate-webcursos", 0);
			}
		} else if ($(this).is("#activate-mailuc")) {
			if($(this).is(":checked")) {
				localStorage.setItem("activate-mailuc", 1);
			} else {
				localStorage.setItem("activate-mailuc", 0);
			}
		}

	});


	function resetOptions() {

		// Local Storage
		localStorage.clear();

		// Usuario
		$(".current-user").text("Ninguno").addClass('no-user');
		$(".forget-user").hide();


		// Desactivar Servicios
		var uncheck_forms = ["#hide-form",
							".services-options input[id*=siding]",
							".services-options input[id*=labmat]",
							".services-options input[id*=aleph]"]
		$(uncheck_forms.join(", ")).prop('checked', false);

		siding_login_pass.val("");
		siding_login_user.val("");
		$("#option-siding-login-box").hide();

		// Activar Portal y Webcursos
		$('.services-options #activate-portal, .services-options #activate-webcursos, .services-options #activate-mailuc').prop('checked', true);

		$("input").each(function() {
			$(this).attr('disabled', 'disabled');		
		});

		$(".login-alert").fadeIn();
	}
});