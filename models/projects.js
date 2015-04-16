var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
  "dateCreated" : Number    // Timestamp milliseconds long
  "title" : String,
  "coverPhoto" : String,     // Image Url
  "members" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  "organizers": [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  "organizations" : [{type: mongoose.Schema.Types.ObjectId,
    ref: 'organizations'}]
  "goals" : String,
  "type" : String
});

module.exports = mongoose.model('Project', projectSchema);
