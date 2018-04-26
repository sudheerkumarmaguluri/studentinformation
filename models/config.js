
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
config = new Schema({
  classes:{
    classid:String,
    classname:String,
    sections:{
      section1:String,
      section2:String,
      section3:String
    },
    subjects:{
      subject1:String,
      subject2:String,
      subject3:String,
      subject4:String,
      subject5:String,
      subject6:String

    },
    terms:{
      term1:String,
      term2:String,
      term3:String
    },

    fee:Number,
    updated: { type: Date, default: Date.now },

  }


});
module.exports = mongoose.model('config', config);
