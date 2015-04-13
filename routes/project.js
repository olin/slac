var mongoose = require("mongoose");
var express = require("express");

var project = express.Router();

project.get("/", function(req, res) {
  projects = [
    {name: "project1"},
    {name: "project2"},
    {name: "project3"},
    {name: "project4"},
    {name: "project5"}
  ];

  res.render("projectList", {projects: projects});
});

project.get("/:id", function(req, res) {
  project = {name: "project"+req.params.id};
  res.render("projectPage", {project: project});
});

project.post("/:id", function(req, res) {

});

project.put("/:id", function(req, res) {

});

project.delete("/:id", function(req, res) {

});

module.exports = project;
