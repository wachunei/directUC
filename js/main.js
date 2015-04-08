$(document).ready(function() {
		$("#back-button").click(function(ev){
			ev.preventDefault();
			window.history.go(-(window.history.length));
		});
});
