var express = require('express');
var app = express();
var path = require('path');
var port     = process.env.PORT || 8080;
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var sendgrid  = require('sendgrid')('esuc-ucla2016', 'esuc2016');
var formidable = require('formidable');
var util = require('util');
var fs   = require('fs-extra');
var qt   = require('quickthumb');
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://esuc-ucla-eventflyer.firebaseio.com/");
var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'hvlcm1lid', 
  api_key: '212382412323749', 
  api_secret: 'nuZQxH_wId3zG-DisGJIgWt8bE4' 
});

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
  var eventFields;
  var flierImage;
  var flierAdded = false;
  var subjectLine = null;

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
    if (flierAdded) {

      cloudinary.uploader.upload(flierImage.path, function(result) {
        temp_name = result.public_id;
        console.log(temp_name);
        console.log(result);

        firebaseObject = myFirebaseRef.child("events").push({
          eventName: eventFields.title,
          eventDate: eventFields.my_date_input,
          eventTime: eventFields.timepicker_input,
          organizationName: eventFields.org,
          organizationEmail: eventFields.email,
          moderated: false,
          flierAdded: flierAdded,
          flierName: flierImage.name,
          cloudinaryName: temp_name
        });

        urllink = firebaseObject.toString();
      });

    }
    else {
      firebaseObject = myFirebaseRef.child("events").push({
        eventName: eventFields.title,
        eventDate: eventFields.my_date_input,
        eventTime: eventFields.timepicker_input,
        organizationName: eventFields.org,
        organizationEmail: eventFields.email,
        moderated: false,
        flierAdded: flierAdded
      });

      urllink = firebaseObject.toString();
    }
    

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