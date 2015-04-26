var express = require("express");
var mongoose = require("mongoose");
var User = require("../models/user");

var router = express.Router();

router.get("/profile", function(req, res) {
  res.render("profile", {user: req.publicUser});
});

router.getPublicUser = function(req, res, next) {
  if (req.session.user) {
    var user = JSON.parse(JSON.stringify(req.session.user));
    delete user._id;
    req.publicUser = user;
  }
  return next();
}

module.exports = router;
