var express = require("express");
var request = require("request");
var mongoose = require("mongoose");

var User = require("../models/user");

var router = express.Router();

router.get("/login", function(req, res) {
  res.redirect("http://www.olinapps.com/external?callback="+"http://localhost:3000/olinAuth/auth");
})

router.get("/logout", function(req, res) {
  req.session.user = null;
  res.redirect("/");
})

router.post("/auth", function(req, res) {
  request("http://www.olinapps.com/api/me?sessionid="+req.body.sessionid, function(err, response, body) {
    body = JSON.parse(body);
    User.findOne({"email": body.email}, function(err, user) {
      if (err) {
        res.status(500).end("Error finding user");
      } else {
        if (!user) {
          user = new User({
            name: body.email, // Parse name from this
            email: body.email,
            profilePhoto: "", // Get photo from OlinApps Directory
            dateJoined: Date.now()
          });
          user.save(function(err){
            if (err) {
              res.status(500).end("Error saving users");
            } else {
              req.session.user = user;
              res.redirect("/");
            }
          })
        } else {
          req.session.user = user;
          res.redirect("/")
        }
      }
    });
  });
})

module.exports = router;

module.exports.isAuth = function(req, res, next) {
  if (req.session.user)
    return next();

  res.redirect("/olinAuth/login");
}
