var express = require('express');
var app = express();
var path = require('path');
var port     = process.env.PORT || 8080;
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');


// use ===============================================================
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname+'/public'));

//set
app.set('view engine', 'ejs');


// routes =============================================================
require('./routes/index')(app);


// launch ======================================================================
app.listen(port);

//expose app
exports = module.exports = app;