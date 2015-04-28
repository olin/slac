var mongoose = require('mongoose');

module.exports = mongoose.Schema({
    "name" : String
  , "coverPhoto" : String     // Image Url
  , "members" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  , "organizers" : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  , "description" : String
  , "projects" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
  , "dateCreated" : Number    // Timestamp milliseconds long
});
