var express = require('express'),
    bodyParser = require('body-parser');

module.exports = () => {
    var app = express();

    app.use('/assets', express.static('../app/public'));

    app.set('view engine', 'ejs');

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: true }));

    require('../app/controllers/setupController')(app);
    // require('../app/controllers/apiController'),
    require('../app/routes/apiRoute')(app);
    require('../app/routes/registerRoute')(app);

    app.get('*', (req, res) => 
        res.send("Appwork!")
    );

    // setupController(app);
    // // apiController(app);
    // apiRoute(app);

    return app;
}