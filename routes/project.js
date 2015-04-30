var mongoose = require("mongoose");
var express = require("express");
var _ = require("lodash");
var Project = require("../models/project");
var User = require("../models/user");

var ObjectId = mongoose.Types.ObjectId;

var project = express.Router();

project.portfolioRequest = function(req, res, next) {
  req.projectType = "portfolio";
  next();
};

project.ideateRequest = function(req, res, next) {
  req.projectType = "ideate";
  next();
};

project.get("/", function(req, res) {
  if (req.projectType) {
    Project.find({"type":"portfolio"}).populate("members").exec(function(err, projects) {
      if (err){
        res.status(500).end("Could not find projects");
      } else {
        res.render("projectList", {projects: projects, buildPage: false, user: req.publicUser});
      }
    });
  } else {
    Project.find().populate("members").exec(function(err, projects) {
      if (err) {
        res.status(500).end("Could not find projects");
      } else {
        res.render("projectList", {projects: projects, buildPage: true, user: req.publicUser});
      }
    });
  }
});

project.get("/:id", function(req, res) {
  var projectId = req.params.id;
  if (req.projectType === "portfolio") {
    Project.findOne({"_id": projectId, "type": "portfolio"}).exec(function(err, project) {
      if (err) {
        res.status(500).end("Error finding projects");
      } else {
        res.render("projectPage", {project: project, buildPage: false, user: req.publicUser});
      }
    });
  } else {
    Project.findOne({"_id": projectId}).exec(function(err, project) {
      if (err) {
        res.status(500).end("Error finding projects");
      } else {
        res.render("projectPage", {project: project, user: req.publicUser, buildPage: true});
      }
    });
  }
});

project.post("/", function(req, res) {
  var creatorId = req.session.user._id;
  var defaultProject = {
    title: "New Project",
    coverPhoto: "http://lorempixel.com/1200/400/",
    goals: "The goal of this project is to tell you what you should type here.",
    galleryId: "72157623755425292",
    type: "public",
    calendarLink: "https://www.google.com/calendar/embed?src=4d8ao8d70avubj73u2ljehoq5o%40group.calendar.google.com&ctz=America/New_York",
    members: [creatorId],
    organizers: [creatorId],
    dateCreated: Date.now()
  }


  var newProject = new Project(defaultProject);
  newProject.save(function(err) {
    if (err) {
      res.status(500).end("Error creating project");
    } else {
      // Also create a reference for the creator to have the project.
      User.update({_id: creatorId },
        {$push: {projects: newProject._id}},
        {upsert:true},
        function(err, data) {
          if (err) {
            console.log(err);
            res.status(500).end("Error giving user reference.");
          } else {
            res.status(200).json({"_id": newProject._id});
          }
      });
    }
  })
});

project.put("/:id", function(req, res) {
  var updatedProject = req.body;
  var projectId = updatedProject._id;

  Project.findOneAndUpdate(
    {"_id": projectId},
    updatedProject,
    function(err, project){
      console.log(project);

      if (err) {
        res.status(500).end("Error finding projects");
      }

      res.status(200).end();
    });
});

project.delete("/:id", function(req, res) {
  var projectId = req.params.projectId;
  Project.remove({"_id": projectId}, function(err) {
    if (err) {
      res.status(500).end("Error deleting project");
    } else {
      res.redirect("/project");
    }
  })
});

module.exports = project;
