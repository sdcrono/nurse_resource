const express = require('./config/express'),
    mongoose = require('mongoose');

const config = require('./config');


const app = express();

const port = process.env.PORT || 3000;

mongoose.connect(config.getDbConnectionString());

app.listen(port, () => console.log('CORS-enabled web server listening on port 3000'));

console.log(' server running at ' + config.getDbConnectionString() + ':' + port);