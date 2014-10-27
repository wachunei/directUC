$(document).ready(function() {
	
	var directUC = (function(){
		
		var directUC = {},
			self = directUC;

		self.form_url = function(service) {
			switch(service) {
				case "siding":
					return self.url_siding();
					break;
				case "webcursos":
					return self.url_webcursos();
					break;
				case "portal":
					return self.url_portal();
					break;
				case "aleph":
					return self.url_aleph();
					break;
				case "labmat":
					return self.url_labmat();
					break;
			}
		}

		self.form_data = function(user, pass, service) {
			switch(service) {
				case "siding":
					return self.data_siding(user, pass);
					break;
				case "webcursos":
					return self.data_webcursos(user,pass)
					break;
				case "portal":
					return self.data_portal(user, pass);
					break;
				case "aleph":
					return self.data_aleph(user, pass);
					break;
				case "labmat":
					return self.data_labmat(user, pass);
					break;
			}
		}

		self.redirect = function(service) {
				switch(service) {
					case "siding":
						return self.url_redirect_siding();
						break;
					case "webcursos":
						return "http://webcurso.uc.cl/portal";
						break;
					case "portal":
						return self.url_portal();
						break;
					case "aleph":
						return self.url_redirect_aleph();
						break;
					case "labmat":
						return self.url_labmat();
						break;
				}	
		}

		self.url_siding = function() {	
			return "https://intrawww.ing.puc.cl/siding/index.phtml";
		}

		self.url_redirect_siding = function() {
			
			var redirect_url;

			if(localStorage.getItem("option-siding-cursos") == true) {
				redirect_url = "https://intrawww.ing.puc.cl/siding/dirdes/ingcursos/cursos/vista.phtml";
			} else {
				redirect_url = self.url_siding();
			}

			return redirect_url;
		}

		self.data_siding = function(user, pass) {

			var data_user = (localStorage.getItem("option-siding-login") == true && localStorage.getItem("option-siding-login-user") ) ? localStorage.getItem("option-siding-login-user") : user,
				data_pass = (localStorage.getItem("option-siding-login") == true && localStorage.getItem("option-siding-login-pass") ) ? localStorage.getItem("option-siding-login-pass") : pass;

				console.log(data_user+" : "+data_pass);


			return {"login": data_user, "passwd": data_pass}	
		}


		self.url_webcursos = function() {
			return "http://webcurso.uc.cl/direct/session";
		}

		self.data_webcursos = function(user, pass) {
			return {"_username": user, "_password": pass};
		}

		self.url_aleph = function() {
			var url;
			$.ajax({
				async: false,
				type: "GET",
				url: "http://aleph.uc.cl/F",
				success: function(data) {
							url = $(data).filter("form").attr("action");
						}
			});

			return url;
		}

		self.url_redirect_aleph = function() {
			if(localStorage.getItem("option-aleph-profile") == true) {
				return "http://aleph.uc.cl/F/?func=bor-info";
			} else {
				return "http://aleph.uc.cl/";
			}
		}

		self.data_aleph = function (user, pass) {
			return {
				"func": "login-session",
				"login_source": "LOGIN-BOR",
				"bor_id": user,
				"bor_verification": pass
			}
		}

		self.url_portal = function() {
			return "https://sso.uc.cl/cas/login?service=https%3A%2F%2Fportal.uc.cl%2Fc%2Fportal%2Flogin";
		}

		self.data_portal = function (user, pass) {

			var execution, lt, data_obj;

			$.ajax({
				async: false,
				type: "GET",
				url: self.url_portal(),
				success: function(data) {
							execution = $(data).find('input[name=execution]').val();
							lt = $(data).find('input[name=lt]').val();
							
							data_obj = {"username": user,
									"password": pass,
									"lt": lt,
									"execution": execution,
									"_eventId": "submit",
									"submit": "Iniciar Sesión"
									};
						}
			});

			return data_obj;
		}

		self.url_labmat = function() {
			return "http://labmat.puc.cl/index.php";
		}

		self.data_labmat = function(user, pass) {

			var dominio = (localStorage.getItem("option-labmat-dominio") == true) ? "@mat.puc.cl" : "@uc.cl";
			return {"accion": "ingreso",
					"usuario": user+dominio,
					"clave": pass}								
		}

		self.login = function(user, pass, service) {
			
			if(service == "mailuc") {
				self.openMail(user, pass);
				return;
			}	
			
			var url = self.form_url(service),
				form_data = self.form_data(user,pass, service),
				redirect_url = self.redirect(service);
			

			$.post(
				url,
				form_data,
				function(data, status, xhr) {
					localStorage.setItem("user", user);
					localStorage.setItem("pass", pass);
					if(service == "siding") {
						var expired = $(data).find("noscript").length > 0;
						
						if (expired) {
							self.login(user, pass, service);
						}
					}
					if (localStorage.getItem("option-sametab") == true) {
						chrome.tabs.update({'url': redirect_url});
						window.close();
					} else {
						chrome.tabs.create({'url': redirect_url});				    				
					}
				}
			);
		}

		self.openMail = function(user, pass) {
			
			var url = "http://webaccess.uc.cl";
			localStorage.setItem("user", user);
			localStorage.setItem("pass", pass);
			localStorage.setItem("mailuc-redirect", 1);

			if (localStorage.getItem("option-sametab") == true) {
				chrome.tabs.update({'url': url});
				window.close();
			} else {
				chrome.tabs.create({'url': url});				    				
			}
		}

		return directUC;

	})();
	
	localStorage.removeItem("mailuc-redirect");

	var user = localStorage.getItem("user"),
		pass = localStorage.getItem("pass"),
		option_single_mode = localStorage.getItem("option-single-mode"),
		siding_user = localStorage.getItem("option-siding-login-user"),
		siding_pass = localStorage.getItem("option-siding-login-pass"),
		// hide_form = localStorage.getItem("hide-form"),
		activate_siding = localStorage.getItem("activate-siding"),
		activate_labmat = localStorage.getItem("activate-labmat"),
		activate_aleph = localStorage.getItem("activate-aleph"),
		activate_portal = localStorage.getItem("activate-portal") || 1,
		activate_webcursos = localStorage.getItem("activate-webcursos") || 1,
		activate_mailuc = localStorage.getItem("activate-mailuc") || 1;

	if (option_single_mode == true ) {
		$("#content, #popup .loader").addClass("gone");
		directUC.login(user, pass, localStorage.getItem("option-single-mode-service"));
	}

	if(activate_siding == true) {
		var service = "siding";
		$("input#"+service).css('display','inline-block');
		$("label[for="+service+"]").css('display','inline-block');
	}

	if(activate_labmat == true) {
		var service = "labmat";
		$("input#"+service).css('display','inline-block');
		$("label[for="+service+"]").css('display','inline-block');
	}
	
	if(activate_aleph == true) {
		var service = "aleph";
		$("input#"+service).css('display','inline-block');
		$("label[for="+service+"]").css('display','inline-block');
	}

	if(activate_portal != true) {
		var service = "portal";
		$("input#"+service).hide();
		$("label[for="+service+"]").hide();
	}

	if(activate_webcursos != true) {
		var service = "webcursos";
		$("input#"+service).hide();
		$("label[for="+service+"]").hide();
	}

	if(activate_mailuc != true) {
		var service = "mailuc";
		$("input#"+service).hide();
		$("label[for="+service+"]").hide();
	}

	if(user) {
		$("#user").val(user).blur();
		$("#password").val(pass).blur();
		$(".service-inputs input").first().focus();
	}
	
	/* if(hide_form == true) {
		$("#content form .text-inputs").hide();
	} */

	$('#content form').keydown(function(event) {
		if(event.which == 13) {
			$(this).submit();
		}
	});

	$("#content form .service-inputs label").click(function(e) {
		e.preventDefault();
		var label_for = $(this).attr('for');
		$('input#'+label_for).click();
		$("#content form").submit();
	});

	$("#content form").submit(function(e) {
		e.preventDefault();
		var user = $(this).find("#user").val(),
			pass = $(this).find("#password").val(),
			service = $(this).find("input[name=service]:checked").val();
		if(user && pass && service) {
			$("#content, #popup .loader").addClass("gone");
			directUC.login(user, pass, service);
		}
	});

	$("#content form .service-inputs input").focus(function() {
		$(this).click();
	});

	$("#content form .service-inputs input").change(function() {
		$('.labelchecked').removeClass('labelchecked');
		$("label[for='" + 	$("#content form .service-inputs input:checked").attr('id') + "']").addClass("labelchecked");
	});

	$("#popup .options-link").click(function (e) {
		e.preventDefault();
		chrome.tabs.create({'url': chrome.extension.getURL("options.html")});
	});

	$("#popup #close").click(function(event) {
		window.close();
	});
});