$.get("/olinAuth/disqus", function(data) {
    cookiesHelper.setCookie("REMOTE_AUTH_S3", data.remote_auth_s3);
    cookiesHelper.setCookie("DISQUS_API_KEY", data.api_key);
});