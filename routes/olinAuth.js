var express = require("express");
var request = require("request");
var mongoose = require("mongoose");
var disqusSignon = require("./disqusAuth");

var User = require("../models/user");

var router = express.Router();

router.get("/login", function(req, res) {
  res.redirect("http://www.olinapps.com/external?callback="
    + "http://" + req.headers.host
    + "/olinAuth/auth"
    + "?req="+req.query.req);
})

router.get("/logout", function(req, res) {
  req.session.user = null;
  res.redirect("/");
})

router.get("/auth", function(req, res) {
  // If you cancel olin authentication midway you will end up here.
  res.redirect("/")
});

router.post("/auth", function(req, res) {
  var redirectUrl = req.query.req;
  if (redirectUrl === "undefined") {
    redirectUrl = "/"
  }
  request("http://www.olinapps.com/api/me?sessionid="+req.body.sessionid, function(err, response, body) {
    body = JSON.parse(body);
    User.findOne({"email": body.user.email}, function(err, user) {
      if (err) {
        res.status(500).end("Error finding user");
      } else {
        if (!user) {
          user = new User({
            name: body.user.name,
            displayName: body.user.nickname || body.user.name,
            email: body.user.email,
            year: body.user.year,
            profilePhoto: "www.olinapps.com"+body.user.thumbnail,
            dateJoined: Date.now()
          });
          user.save(function(err){
            if (err) {
              res.status(500).end("Error saving users");
            } else {
              req.session.user = user;
              req.session.disqus = disqusSignon(user);
              res.redirect(redirectUrl);
            }
          })
        } else {
          req.session.user = user;
          req.session.disqus = disqusSignon(user);
          res.redirect(redirectUrl)
        }
      }
    });
  });
})

router.get("/disqus", function(req, res) {
  res.status(200).json(req.session.disqus);
});

router.isAuth = function(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/olinAuth/login?req="+req.originalUrl);
}

module.exports = router;
