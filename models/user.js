var mongoose = require("mongoose");

module.exports = mongoose.model("User", mongoose.Schema({
  "name" : String,
  "displayName" : String,
  "profilePhoto" : String,  // Image Url
  "email" : String,
  "projects" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'projects' }],
  "organizations" : [{type: mongoose.Schema.Types.ObjectId,
    ref: 'organizations'}],
  "year": Number,
  "dateJoined" : Number    // Timestamp milliseconds long
}));
