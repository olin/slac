var CryptoJS = require("crypto-js");

var DISQUS_SECRET = process.env.DISQUS_SECRET || "";
var DISQUS_PUBLIC = process.env.DISQUS_PUBLIC || "";

  var disqusSignon = function (user) {
  var disqusData = {
    id: user._id,
    username: user.name,
    email: user.email
  };

  var disqusStr = JSON.stringify(disqusData);
  var timestamp = Math.round(+new Date() / 1000);

  /*
   * Note that `Buffer` is part of node.js
   * For pure Javascript or client-side methods of
   * converting to base64, refer to this link:
   * http://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
   */
  var message = new Buffer(disqusStr).toString('base64');

  /*
   * CryptoJS is required for hashing (included in dir)
   * https://code.google.com/p/crypto-js/
   */
  var result = CryptoJS.HmacSHA1(message + " " + timestamp, DISQUS_SECRET);
  var hexsig = CryptoJS.enc.Hex.stringify(result);

  return {
    pubKey: DISQUS_PUBLIC,
    auth: message + " " + hexsig + " " + timestamp
  };
}

module.exports = disqusSignon;
