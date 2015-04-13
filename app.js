var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var argv = require('minimist')(process.argv.slice(2));

var project = require("./routes/project");

var app = express();

var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || "mongodb://localhost/slac";

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Debug Logger
console.dlog = function(message) {
  if (argv.debug) {
      var args = Array.prototype.slice.call(arguments, 1)
      console.log(">>", message, args.join(','));
  }
};

app.use(logger(argv.debug ? "dev" : "production"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
  res.render("index");
});

app.use("/project", project);

mongoose.connect(mongoURI);
app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});
