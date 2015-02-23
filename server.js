var express = require('express');
var app = express();
var path = require('path');
var port     = process.env.PORT || 8080;
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var sendgrid  = require('sendgrid')('esuc-ucla', 'Uclaesuc2015');


// use ===============================================================
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname+'/public'));






//set
app.set('view engine', 'ejs');


// routes =============================================================
require('./routes/index')(app,sendgrid);


// launch ======================================================================
app.listen(port);

//expose app
exports = module.exports = app;