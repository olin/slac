var mongoose = require("mongoose");
var express = require("express");
var _ = require("lodash");
var Project = require("../models/project");

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
    coverPhoto: "defaultImage.png", //TODO: Get an image
    goals: "The goal of this project is to tell you what you should type here.",
    type: "public",
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
  var projectId = req.session.user._id;
  var updatedProject = req.params.project;
  Project.findOne({"_id": projectId}, function(err, project){
    if (err) {
      res.status(500).end("Error finding projects");
    } else {
      _.assign(project, updatedProject);
      project.save(function(err) {
        if (err) {
          res.status(500).end("Error updating project");
        } else {
          res.render("projectPage", {project: project});
        }
      })
    }
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
