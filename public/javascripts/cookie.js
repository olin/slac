var cookiesHelper = {};

/**
* Sets a cookie on the browser
* @param {string} name - The name of the cookie to set
* @param {string?} value - The value to set the cookie equal to
* @param {float} [minutes = end of session] - The length of time before the
*                                             cookie expires
*/
cookiesHelper.setCookie = function(name, value, minutes) {
  var expires;
  if (minutes) {
    var date = new Date();
    date.setTime(date.getTime()+(minutes*60*1000));
    expires = "; expires="+date.toUTCString();
  } else {
    expires = "";
  }

  var encodedValue = encodeURIComponent(value);

  document.cookie = name+"="+encodedValue+expires+"; path=/";
};

/**
* Reads a cookie from the browser
* @param {string} name - The name of the cookie to read
* @returns {string} - The value of the read server
*/
cookiesHelper.getCookie = function(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i=0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1,c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      var value = c.substring(nameEQ.length,c.length);
      var decodedValue = decodeURIComponent(value);
      return decodedValue;
    }
  }
  return null;
};

/**
* REMoves a cookie from the browser
* @param {string} name - The name of the cookie to erase
*/
cookiesHelper.eraseCookie = function(name) {
  cookiesHelper.setCookie(name, "", -1);
};