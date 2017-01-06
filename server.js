var express = require('express');
var app = express();
var path = require('path');
var port     = process.env.PORT || 8080;
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var sendgrid  = require('sendgrid')(credentials);
var formidable = require('formidable');
var util = require('util');
var fs   = require('fs-extra');
var qt   = require('quickthumb');
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://esuc-ucla-eventflyer.firebaseio.com/");
var cloudinary = require('cloudinary');

cloudinary.config({ 
  //secret
});

// use ===============================================================
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname+'/public'));
app.use(qt.static(__dirname + '/'));

var formatTime = function (time) {
  var temp = time;
  var temp1 = time.split(':');
  var hrs = parseInt(temp1[0]);
  var temp2 = temp1[1].split(' ');
  var min = temp2[0];
  var mer = temp2[1];
  if (mer == "PM" && hrs != 12) {
    hrs+=12;
  }
  if (mer == "AM" && hrs == 12) {
    hrs=0;
  }
  console.log(hrs);
  console.log(min);
  var timeVal = hrs * 60 * 60 * 1000 + min * 60 * 1000;
  return timeVal;
}

// uploading flyer pictures ========================================
app.post('/upload', function (req, res){
  var form = new formidable.IncomingForm();
  var eventFields;
  var flierImage;
  var flierAdded = false;
  var subjectLine = "";

  form.parse(req, function(err, fields, files) {
    res.render('uploadsuccess');
    res.end();

    eventFields = fields;
    flierImage = files.flierImage;

    if (files.flierImage.name != "") { 
      console.log(files.flierImage.name);
      subjectLine = "Flier Added: " + files.flierImage.name;
      flierAdded = true;
    }
  });

  form.on('end', function() {
    console.log(flierImage);
    var temp_name = null;
    var firebaseObject = [];
    var urllink = null;
    console.log("Flier Added " + flierAdded);
    var eventTimeMs = formatTime(eventFields.timepicker_input);
    if (flierAdded) {

      cloudinary.uploader.upload(flierImage.path, function(result) {
        temp_name = result.public_id;
        console.log(temp_name);
        console.log(result);


        firebaseObject = myFirebaseRef.child("events").push({
          eventName: eventFields.title,
          eventDate: eventFields.my_date_input,
          eventTime: eventFields.timepicker_input,
          eventTimeMs: eventTimeMs,
          organizationName: eventFields.org,
          organizationEmail: eventFields.email,
          moderated: false,
          location: eventFields.location,
          flierAdded: flierAdded,
          flierName: flierImage.name,
          cloudinaryName: temp_name,
          cloudinaryURL: result.url
        });
      }, 
      {
        width: 700,
        height: 700,
        crop: "fit",
        format: "png"
      });
    }
    else {
      firebaseObject = myFirebaseRef.child("events").push({
        eventName: eventFields.title,
        eventDate: eventFields.my_date_input,
        eventTime: eventFields.timepicker_input,
        eventTimeMs: eventTimeMs,
        organizationName: eventFields.org,
        location: eventFields.location,
        organizationEmail: eventFields.email,
        moderated: false,
        flierAdded: flierAdded
      });
    }

    urllink = firebaseObject.toString();

    sendgrid.send({
      to:       'esuc.ucla.webmaster@gmail.com',
      from:     'esuc.ucla.webmaster@gmail.com',
      subject:  'New Event Added to Calender. ' + subjectLine,
      text:     'New Event Added! Please Review @ ' + urllink
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
