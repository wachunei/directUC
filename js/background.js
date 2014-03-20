chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request == "getData") {
    	sendResponse({user: localStorage.getItem("user"), pass: localStorage.getItem("pass"), redirect: (localStorage.getItem("mailuc-redirect") == true)});
    } else if (request == "deleteRedirect") {
    	localStorage.removeItem("mailuc-redirect");
    	sendResponse({});
    }
});