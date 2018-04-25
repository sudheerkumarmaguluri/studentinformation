var express = require('express');
var multer = require('multer');
var winston=require('winston')
var upload = multer({ dest: 'uploads/' })
var router = express.Router();
var express = require('cookie-parser');
var path= require('path')

var express = require('express');

var mongo = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongo);

var Student = require('../models/employee');


router.post('/studentinfo', function(req, res) {


res.send(req.body)

})
router.get('/studentdetails',function (req,res,next) {
  Student.find({}, function (err, data) {
    if (err) throw err;
console.log(data)
    res.send(data)

  });
})
router.post('/post' ,function(req,res)
{
  var student= new Student({
    admissionnumber: req.body.admissionnumber,
    id:req.body.id,
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

  student.save({ sort: { 'admissionnumber': -1 } },function (err,success) {
    if (err)
      res.send(err)
    else
      res.send("saved")
    //res.send("saved")

  })

 // res.send(student)




})
router.get('/delete/:admissionnumber',function (req,res) {
Student.findOneAndRemove(req.params.admissionnumber,req.body,function (err,data) {
    if(!err) {
      console.log("Deleted");
      res.send("deleted")
    }
})

})
router.put('/update/:admissionnumber',function (req,res) {

  var conditions={admissionnumber:req.params.admissionnumber};

Student.update(conditions,req.body)
  .then(doc=>{
    if(!doc) { res.status(404).end();}
    return res.status(200).json(doc)
  })

})
router.get('/findbyid/:id',function (req,res) {
  Student.findById(req.params.id, (err,data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  });

})



module.exports = router;
