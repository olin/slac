var mongoose = require("mongoose");
var express = require("express");
var _ = require("lodash");
var Project = require("../models/project");
var User = require("../models/user");

var ObjectId = mongoose.Types.ObjectId;

var project = express.Router();

project.portfolioRequest = function(req, res, next) {
  req.projectType = "project";
  next();
};

project.ideateRequest = function(req, res, next) {
  req.projectType = "ideate";
  next();
};

project.buildRequest = function(req, res, next) {
  req.projectType = "build";
  req.buildPage = true;
  next();
}

project.get("/", function(req, res) {
  Project.find({"type":req.projectType}).populate("members").exec(function(err, projects) {
    if (err){
      res.status(500).end("Could not find projects");
    } else {
      res.render(
        (req.projectType === "build" ? "project" : req.projectType) + "List",
         {projects: projects, buildPage: req.buildPage, user: req.publicUser});
    }
  });
});

project.get("/:id", function(req, res) {
  var canEdit = false;
  var canPublish = false;

  Project.findOne({"_id": req.params.id, "type": req.projectType})
    .populate("members")
    .exec(function(err, project) {
      if (err) {
        res.status(500).end("Error finding projects");
      } else {
        project.members.forEach(function(member){
          if (req.session.user && req.session.user._id == member._id) {
            canEdit = true;
          }
        });

        if (req.session.user && project.organizers.indexOf(req.session.user._id) >= 0) {
          canPublish = true;
        }

        res.render(
          (req.projectType === "build" ? "project" : req.projectType) + "Page",
         {project: project, buildPage: req.buildPage, user: req.publicUser, canPublish: canPublish, canEdit: canEdit, canJoin: !canEdit});
      }
  });
});

project.post("/", function(req, res) {
  var creatorId = req.session.user._id;
  var defaultProject = {
    title: "New Project",
    coverPhoto: "http://lorempixel.com/1200/400/",
    goals: "The goal of this project is to tell you what you should type here.",
    description: "The description of this project is too good.",
    galleryId: "72157623755425292",
    type: req.projectType,
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
