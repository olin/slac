var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var session = require('express-session');
var argv = require('minimist')(process.argv.slice(2));

var olinAuth = require('./routes/olinAuth');
var project = require("./routes/project");
var user = require("./routes/user");

var app = express();

var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || "mongodb://localhost/slac";

var hbs = exphbs.create({
  defaultLayout: "main",
  // Specify helpers which are only registered on this instance.
  helpers: {
    json: function(context) { return JSON.stringify(context); },
    debug: function(context) { console.log(context);}
  }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Debug Logger
console.dlog = function(message) {
  if (argv.debug) {
      var args = Array.prototype.slice.call(arguments, 1)
      console.log(">>", message, args.join(','));
  }
};

app.use(logger(argv.debug ? "dev" : "tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/project", olinAuth.isAuth, user.getPublicUser, project);
app.use("/", project.portfolioRequest, user.getPublicUser, project);
app.use("/portfolio", project.portfolioRequest, user.getPublicUser, project)
app.use("/ideate", project.ideateRequest, user.getPublicUser, project)
app.use("/olinAuth", olinAuth);
app.use("/user", olinAuth.isAuth, user.getPublicUser, user)

mongoose.connect(mongoURI);
app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
  console.log("MongoURI:", mongoURI);
});
