var express = require("express");
var mongoose = require("mongoose");
var User = require("../models/user");

var router = express.Router();

router.get("/profile/", function(req, res) {
  res.render("profile", {user: req.publicUser});
});

router.get("/profile/:id", function(req, res) {
  User.find({_id: req.params.id}).populate("projects").exec(function(err, foundUsers) {
    var chosenUser = foundUsers[0];
    res.render("profile", {user: chosenUser});
  });
});

router.getPublicUser = function(req, res, next) {

  if (req.session.user) {
    var user = JSON.parse(JSON.stringify(req.session.user));

    User.find({_id: user._id}).populate("projects")
      .exec(function(err, foundUsers){
        if(err) console.log("Can't give users their projects: " + err);
        user = foundUsers[0];

        delete user._id;

        req.publicUser = user;

        return next();
    });
  } else {
    return next();
  }
}

module.exports = router;
