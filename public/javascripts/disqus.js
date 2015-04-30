var disqus_config = function() {
    // The generated payload which authenticates users with Disqus
    this.page.remote_auth_s3 = cookiesHelper.getCookie("REMOTE_AUTH_S3");
    this.page.api_key = cookiesHelper.getCookie("DISQUS_API_KEY");
}

/* * * CONFIGURATION VARIABLES * * */
var disqus_shortname = 'olinslac';
var disqus_developer=1;
 /* * * DON'T EDIT BELOW THIS LINE * * */
 (function() {
   var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
   dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
   (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
 })();