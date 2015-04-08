$(document).ready(function() {
		$("#back-button").click(function(ev){
			ev.preventDefault();
			window.history.go(-(window.history.length) + 1);
		});
		$('.history-size span').text(window.history.length);
});
