var disqus_config = function () {
  // The generated payload which authenticates users with Disqus
  this.page.remote_auth_s3 = '<message> <hmac> <timestamp>';
  this.page.api_key = 'public_api_key';
}

/* * * CONFIGURATION VARIABLES * * */
var disqus_shortname = 'olinslac';

/* * * DON'T EDIT BELOW THIS LINE * * */
(function() {
  var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();