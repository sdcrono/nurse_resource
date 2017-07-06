// process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// var express = require('express'),
const express = require('./config/express'),
    // bodyParser = require('body-parser'),
    mongoose = require('mongoose');

const config = require('./config');
// var setupController = require('./controllers/setupController'),
//     apiController = require('./controllers/apiController'),
//     apiRoute = require('./routes/apiRoute');


const app = express();

const port = process.env.PORT || 3000;

// app.use('/assets', express.static('./public'));

// app.set('view engine', 'ejs');

// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.getDbConnectionString());

// setupController(app);
// // apiController(app);
// apiRoute(app);

app.listen(port, () => console.log('CORS-enabled web server listening on port 3000'));

console.log(' server running at ' + config.getDbConnectionString() + ':' + port);