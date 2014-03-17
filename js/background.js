chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request == "getData") {
    	sendResponse({user: localStorage.getItem("user"), pass: localStorage.getItem("pass")});
    }
});