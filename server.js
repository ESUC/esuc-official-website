var express = require('express');
var app = express();
var path = require('path');
var port     = process.env.PORT || 8080;
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var sendgrid  = require('sendgrid')('esuc-ucla2016', 'esuc2016');
var formidable = require('formidable');
var  util = require('util');
var fs   = require('fs-extra');
var qt   = require('quickthumb');
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://esuc-ucla-eventflyer.firebaseio.com/");


// use ===============================================================
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname+'/public'));
app.use(qt.static(__dirname + '/'));


// uploading flyer pictures ========================================
app.post('/upload', function (req, res){
  var form = new formidable.IncomingForm();
  var name;
  form.parse(req, function(err, fields, files) {
    res.render('uploadsuccess');
    res.end();
    console.log(fields);
    console.log(files);

    myFirebaseRef.child("events").push({
      eventName: fields.title,
      eventDate: fields.my_date_input,
      eventTime: fields.timepicker_input,
      organizationName: fields.org,
      organizationEmail: fields.email,
      moderated: false,
      flierName: files.upload.name
    })
    var subjectLine = null;
    if (files.upload.name != null) { 
        subjectLine = "Flier Added: " + files.upload.name;
    }

    sendgrid.send({
      to:       'esuc.ucla.webmaster@gmail.com',
      from:     'esuc.ucla.webmaster@gmail.com',
      subject:  'New Event Added to Calender. ' + subjectLine,
      text:     'New Event Added! Please Review'
    }, function(err, json) {
      if (err) { return console.error(err); }
      console.log(json);
    });
  });
});



//set
app.set('view engine', 'ejs');


// routes =============================================================
require('./routes/index')(app,sendgrid);


// launch ======================================================================
app.listen(port);

//expose app
exports = module.exports = app;