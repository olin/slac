var mongoose = require("mongoose");
var express = require("express");
var _ = require("lodash");
var Project = require("../models/project");

var ObjectId = mongoose.Types.ObjectId;

var project = express.Router();

project.get("/", function(req, res) {
  Project.find().exec(function(err, projects) {
    if (err) {
      res.status(500).end("Could not find projects");
    } else {
      console.log(projects);
      res.render("projectList", {projects: projects});
    }
  })
});

project.get("/:id", function(req, res) {
  var projectId = req.params.id;
  console.log(projectId);
  Project.findOne({"_id": projectId}).exec(function(err, project) {
    console.log(project);
    if (err) {
      res.status(500).end("Error finding projects");
    } else {
      res.render("projectPage", {project: project});
    }
  })
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
    organizers: [creatorId],
    dateCreated: Date.now()
  }
  var newProject = new Project(defaultProject);
  newProject.save(function(err) {
    if (err) {
      res.status(500).end("Error creating project");
    } else {
      res.status(200).json({"_id": newProject._id});
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
