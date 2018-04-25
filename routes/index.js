//import the express module
var express = require('express');
var multer = require('multer');
var winston=require('winston')
var upload = multer({ dest: 'uploads/' })
var router = express.Router();
//import the cookie-parser module to our application
var express = require('cookie-parser');
var path= require('path')

var express = require('express');

var mongo = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongo);
//import schema file to our application .this employee.js file
var Student = require('../models/employee');
winston.add(
  winston.transports.File, {
    filename: 'studentinformation.log',
    level: 'info',
    json: true,
    eol: 'rn',
    timestamp: true
  }
)
winston.log('info',"check your data..")


//this router used for get all studentdetails

router.get('/studentdetails',function (req,res,next) {
  winston.log('info',"this is starting page");

  Student.find({}, function (err, data) {
    if (err) throw err;
console.log(data)
    res.status(200).send(data)

  });
})
//this router used for post all studentdetails

router.post('/post' ,function(err,req,res,next)
{  winston.log('info',"this is admission details page");

  var student= new Student({
    admissionnumber: req.body.admissionnumber,
    stid:"1oo",
    name: req.body.name,
    lastname: req.body.lastname,
    mothername: req.body.mothername,
    fathername: req.body.fathername,
    guardian: req.body.guardianname,
    phonenumber: req.body.phonenumber,
    mailid: req.body.mailid,
    class: req.body.class,
    bloogroup: req.body.bloogroup,
    address: req.body.address


  })
    student.save({},function (err,success) {
    if (err)
      res.send(err)
    else{
      //res.send("saved")
    Student.count({}, function( err, count){

      var sc="EX"+count++
      console.log("dfd "+success.id)
      Student.findOneAndUpdate({_id:success.id}, {stid:sc}, {upsert:true}, function(err, doc){
       // console.log(success)
        if (err) return res.send({status:500, message: 'internal error', type:'internal'});

        return res.status(201).send({message: 'create student record', type:'internal'});
      })

    })
    //  res.send(suc)
  }
  function getNextSequenceValue(){

    var sequenceDocument = db.counters.findOneAndUpdate(
      { "_id" : sequenceName },
      { $inc : { sequence_value : 1 } },
      { new : true }
    );
    return sequenceDocument.sequence_value;
  }


})

})

//res.send("saved")



 // res.send(student)



//this router used for delete student information by id

router.get('/delete/:admissionnumber',function (req,res) {
  winston.log('info',"this is admission details page");

  Student.findOneAndRemove(req.params.admissionnumber,req.body,function (err,data) {
    if(!err) {
      console.log("Deleted");
      res.status(204).send("deleted")
    }
})

})
//this router used for update student information by id

router.put('/update/:admissionnumber',function (err,req,res,next) {
  winston.log('info',"updating student info through addmissionnumber");


  var conditions={admissionnumber:req.params.admissionnumber};

Student.update(conditions,req.body)
  .then(doc=>{
    if(!doc) { res.status(404).end();}
    return res.status(202).json(doc)
  })

})
//this router used for get student information by id

router.get('/findbyid/:id',function (req,res) {
  winston.log('info',"find documnet by id");

  Student.findById(req.params.id, (err,data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  });

})



module.exports = router;
