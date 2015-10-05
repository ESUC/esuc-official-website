var express = require('express');
var app = express();
var path = require('path');
var port     = process.env.PORT || 8080;
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var sendgrid  = require('sendgrid')('esuc-ucla', 'Uclaesuc2015');
var formidable = require('formidable');
var  util = require('util');
var fs   = require('fs-extra');
var qt   = require('quickthumb');


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
    /*res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));*/
    res.render('uploadsuccess');
    res.end();
    //console.log(JSON.stringify(fields.title) + " " + JSON.stringify(fields.email));
    name = fields.title;
    if (JSON.stringify(files.upload.name) == null)
    {
      console.log("Error no file submitted");
    }
    var requestDetails =  [{"eventName": " ", "organizationName": " ", "contactEmail" : " ", "fileName" : " "}];
    requestDetails[0].eventName = fields.title;
    requestDetails[0].organizationName = fields.org;
    requestDetails[0].contactEmail = fields.email;
    requestDetails[0].fileName = files.upload.name;
    //console.log(JSON.stringify(requestDetails.eventName));

    fs.appendFile('uploads/flierList.txt', JSON.stringify(requestDetails[0])+"\r\n", 'utf8', function(){});
  });

  form.on('end', function(fields, files) {
    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file */
    var file_name = this.openedFiles[0].name;
    /* Location where we want to copy the uploaded file */
    var new_location = 'public/img/events/';

    fs.copy(temp_path, new_location + file_name, function(err) {  
      if (err) {
        console.error(err);
        //alert("Submission unsuccesful!");
      } else {
        console.log("success!");
        
      }
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