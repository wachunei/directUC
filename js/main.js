$(document).ready(function() {
		$("#back-button").click(function(ev){
			ev.preventDefault();
			window.history.back(-100);
		});
});
