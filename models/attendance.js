/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;
results = new Schema({
  "id": String,
  "name": String,
  "english": String,
  "mathes": String,
  "science": String,
  "history": String,
  "locallanguage": String,
  "total": String,
  "percentage": String
});
module.exports = mongoose.model('results', results);
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
attendance = new Schema({
  teacherid:String,
  schoolid: String,
  studentid: String,
   date: {
  created:  {type: Date, default: Date.now},
},
  status: String

});
module.exports = mongoose.model('attendance', attendance);
