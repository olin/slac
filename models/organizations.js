var mongoose = require('mongoose');

module.exports = mongoose.Schema({
    "name" : String
  , "coverPhoto" : String     // Image Url
  , "members" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
  , "organizers" : { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
  , "description" : String
  , "projects" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'projects'}]
  , "dateCreated" : Number    // Timestamp milliseconds long
});
