//import the express module
var express = require('express');
var multer = require('multer');
var winston=require('winston')
var upload = multer({ dest: 'uploads/' })
var router = express.Router();
//import the cookie-parser module to our application
var express = require('cookie-parser');
var path= require('path')
//var cors = require('cors')
var attendance=require('../models/attendance')
var express = require('express');
var  request = require('request');
var clgid;

var mongo = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongo);
//import schema file to our application .this employee.js file
var Student = require('../models/employee');
var adddetail=require('../models/adddetails')
var config=require('../models/config')

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

router.post('/post' ,function(req,res,next)
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

      res.status(404).send({error:err.message})

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

router.delete('/delete/:stid',function (req,res) {
  winston.log('info',"this is admission details page");

  Student.findOneAndRemove({stid:req.params.stid},function (err,data) {
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
//========================================================attendance==================================================

//here post the attendance details to attendence collection in mongoose
router.post('/attendancepost' ,function(req,res,next)
{  winston.log('info',"this is attendance details page");
//this  is schema representation of attendance collection
  var atten= new attendance({
    teacherid: req.body.teacherid,
    schoolid: req.body.schoolid,
    studentid: req.body.studentid,
    date: req.body.date,
    status: req.body.status


  })
  //here save() method save all req.body into mongoose collection
  atten.save({},function (err,success) {
    // if error will occured its showing error
    if (err)

      res.status(404).send({error:err.message})
// if does'nt contain errors then else message will be display in json format
    else {
      res.status(201).send({"message":"successfully saved"})
    }
  })

})
// here this router is using for get all attendance information in json format
router.get('/attendanceget',function (req,res,next) {
  winston.log('info',"this is starting page");
//find() method is using for find all documents from collection

  attendance.find({}, function (err, data) {
    if (err) throw err;
    console.log(data)
    res.status(200).send(data)

  });
})
//here delete the specified teacherid document in this router
router.delete('/attendancedelete/:teacherid',function (req,res) {
  winston.log('info',"this is admission details page");
//findOneAndRemove() will using for delete the document.
  attendance.findOneAndRemove({teacherid:req.params.teacherid},function (err,data) {
    if(err) {
      console.log("error");
    }
    else {
      res.status(201).send({"message":"deleted successfully..."})
    }
  })

})
//this router is using for update the attendance collection
router.put('/attendanceupdate/:teacherid',function (req,res) {
  console.log("update")
  winston.log('info',"updating student info through attendance");


  var conditions={teacherid:req.params.teacherid};
//update method() using for updaet the specific recoed in attendance collection
  attendance.update(conditions,req.body)
    .then(doc=>{
      if(!doc) { res.status(404).end();}
      return res.status(202).json(doc)
    })

})
//=====================================================adddetails==================================================

router.post('/addmoredetails' ,function(req,res)
{  winston.log('info',"this is attendance details page");
//this  is schema representation of attendance collection
  var add= new adddetail({
    noofclass: {
      classid:req.body.classid,
      classname: req.body.classname,
      section:req.body.section ,
      terms: req.body.terms,
      fee: req.body.fee
  }
  })
  //here save() method save all req.body into mongoose collection
  add.save({},function (err,success) {
    // if error will occured its showing error
    if (err)

      res.status(404).send({error:err.message})
// if does'nt contain errors then else message will be display in json format
    else {
      res.status(201).send({"message":"successfully saved"})
    }
  })

})

//this router is using for update the attendance collection
router.get('/addde',function (req,res,body) {
  console.log("update")
  winston.log('info',"updating student info through attendance");

var url='http://10.10.5.59:3000/'


request(url,function(err,res,body) {
  var clgdetails = JSON.parse(body)
  console.log(clgdetails)
  for(var i in clgdetails){
    var clid = clgdetails[i].clgcode
console.log(clid)}
clgid=clid;

})



})


router.put('/adddetails/:id',function (req,res) {

  var conditions={_id:req.params._id};
//update method() using for updaet the specific recoed in attendance collection
  console.log(conditions)
  adddetail.update(conditions,req.body)
    .then(doc=>{
      if(!doc) { res.status(404).end();}
      return res.status(202).json(doc)
    })
})

router.put('/rangaid/:clgcode',function (req,res) {
  var url='http://10.10.5.59:3000/'


  request(url,function(err,res,body) {
    var clgdetails = JSON.parse(body)
    console.log(clgdetails)
    for(var i in clgdetails) {
      var clid = clgdetails[i].clgcode
      console.log(clid)}
      clgid = clid
      var conditions = {classid: req.params.clgid};
//update method() using for updaet the specific recoed in attendance collection
      console.log(conditions)
      adddetail.update(conditions, req.body)
        .then(doc => {
          if (!doc) {
            res.status(404).end();
          }else{
         // return res.status(202).json(doc)
            console.log("saved")
            }
        })
    })

})
//===========================================confid=====================================
router.post('/classesconfig' ,function(req,res)
{  winston.log('info',"this is attendance details page");
//this  is schema representation of attendance collection

//this  is schema representation of attendance collection
  /*var config = new Schema({
      classes: {
        classid: req.body.classid,
        classname: req.body.classname,
        sections: {
          section1: req.body.section1,
          section2: req.body.section2,
          section3: req.body.section3
        },
        subjects: {
          subject1: req.body.subject1,
          subject2: req.body.subject2,
          subject3: req.body.subject3,
          subject4: req.body.subject4,
          subject5: req.body.subject5,
          subject6: req.body.subject6

        },
        terms: {
          term1: req.body.term1,
          term2: req.body.term2,
          term3: req.body.term3
        },

        fee: req.body.fee

      }

  });*/
  var configs = new config(req.body);

  //here save() method save all req.body into mongoose collection
    configs.save({},function (err,success) {
      // if error will occured its showing error
      if (err)

        res.status(404).send({error:err.message})
// if does'nt contain errors then else message will be display in json format
      else {
        res.status(201).send({"message":"successfully saved"})
      }
    })

  })

router.get('/getclass',function (req,res) {
  config.find({}, function (err, data) {
    if (err) throw err;
    console.log(data)
    res.status(200).send(data)

  });

})
router.delete('/classesdelete/:_id',function (req,res) {
  winston.log('info',"this is admission details page");
//findOneAndRemove() will using for delete the document.
  config.findByIdAndRemove({_id:req.params._id},function (err,data) {
    if(err) {
      console.log("error");
    }
    else {
      res.status(202).send({"message":"deleted successfully..."})
    }
  })

})
router.get('/getclassdetails/:_id',function (req,res) {
  winston.log('info',"this is admission details page");
//findOneAndRemove() will using for delete the document.
  config.findOne({_id:req.params._id},function (err,data) {
    if(err) {
      console.log("error");
    }
    else {
      res.status(200).send({data})
    }
  })

})
router.put('/updateclassdetails/:_id',function (req,res) {
  winston.log('info',"this is admission details page");
//findOneAndRemove() will using for delete the document.
  var conditions={_id:req.params._id};

  config.update(conditions,req.body)
    .then(doc=>{
      if(!doc) { res.status(404).end();}
      return res.status(202).json(doc)
    })

})

module.exports = router;
