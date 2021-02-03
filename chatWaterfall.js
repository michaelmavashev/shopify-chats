// Define Variables
var fbElem = document.getElementById("messengerChat");
var iOSElem = document.getElementById("apple-business-chat");
var shopElem = document.getElementById("shopifyChat");

// Set all chat streams to hidden by default
fbElem.style.display = "none";
iOSElem.style.display = "none";
shopElem.style.display = "none";

// Set all variables false by default
var fbDetected = false;
var iOSDetected = false;
var defaultChat = false;

// Begin iOS Logic, first
var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (isIOS) {
  var iOSDetected = true;
} else {
  var iOSDetected = false;
}

// Begin Facebook Logic
function statusChangeCallback(response) {
	if (response.status === 'connected') {
    var fbDetected = true;
  } else if (response.status === 'not_authorized') {
    var fbDetected = true;
  } else {
    var fbDetected = false;
  }
}

// Begin Default Logic (Shopify Chat)
if (iOSDetected == true) {
  iOSElem.style.display = "block";
  fbElem.style.display = "none";
  shopElem.style.display = "none";
  console.log("iOS Detected");
} else if (iOSDetected == true && fbDetected == true) {
  // Add display to these if you would like to change priority
  iOSElem.style.display = "block";
  fbElem.style.display = "none";
  shopElem.style.display = "none";
  console.log("iOS & FB Detected");
} else if (iOSDetected == false && fbDetected == true) {
  fbElem.style.display = "block";
  iOSElem.style.display = "none";
  shopElem.style.display = "none";
  console.log("FB Detected, iOS not detected");
} else if (iOSDetected == false && fbDetected == false) {
  fbElem.style.display = "none";
  iOSElem.style.display = "none";
  shopElem.style.display = "block";
  console.log("iOS & FB not detected, defaulting to Shopify Chat...")
}

window.fbAsyncInit = function() {
  FB.init({
    appId : '403754610280458',
    cookie : true,
    xfbml : true,
    version : 'v9.0'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));