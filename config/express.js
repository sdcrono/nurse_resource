const express = require('express'),
    path = require('path'),
    cors = require('cors'),
    bodyParser = require('body-parser');

module.exports = () => {
    const app = express();

    app.use(cors());

    // app.use('/assets', express.static('../app/public'));
    app.use(express.static(path.join(__dirname, '../public/src')));

    app.set('view engine', 'ejs');

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: true }));

    require('../app/controllers/setupController')(app);
    // require('../app/controllers/apiController'),
    require('../app/routes/apiRoute')(app);
    require('../app/routes/rolePermissionRoute')(app);
    require('../app/routes/registerRoute')(app);

    app.get('*', (req, res) => 
        // res.send("Appwork!")
        res.sendFile(path.join(__dirname, '../public/src/index.html'))
    );

    // setupController(app);
    // // apiController(app);
    // apiRoute(app);

    return app;
}