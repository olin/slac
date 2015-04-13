var mongoose = require('mongoose');

module.exports = mongoose.Schema({
    "creator" : { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
  , "dateCreated" : Number    // Timestamp milliseconds long
  , "title" : String
  , "coverPhoto" : String     // Image Url
  , "members" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
  , "organizers": [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
  , "organizations" : [{type: mongoose.Schema.Types.ObjectId,
                         ref: 'organizations'}]
  , "goals" : String
    , "type" : String
});
