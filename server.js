// process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var config = require('./config');
var setupController = require('./controllers/setupController'),
    apiController = require('./controllers/apiController');


var app = express();

var port = process.env.PORT || 3000;

app.use('/assets', express.static('./public'));

app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.getDbConnectionString());

setupController(app);
apiController(app);

app.listen(port);