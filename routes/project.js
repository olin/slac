var mongoose = require("mongoose");
var express = require("express");

var project = express.Router();

project.get("/", function(req, res) {
  projects = [
    {projectName: "project1"},
    {projectName: "project2"},
    {projectName: "project3"},
    {projectName: "project4"},
    {projectName: "project5"}
  ];

  res.render("projectList", {projects: projects});
});

project.get("/:id", function(req, res) {
  console.log(req.params.id);
  project = {projectName: "project"+req.params.id};
  res.render("projectPage", {project: project});
});

project.post("/:id", function(req, res) {

});

project.put("/:id", function(req, res) {

});

project.delete("/:id", function(req, res) {

});

module.exports = project;
