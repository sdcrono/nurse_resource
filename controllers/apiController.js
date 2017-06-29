var Users = require('../models/userModel')

module.exports = function(app) {

    // app.get('/api/users/:uname', function(req, res) {
    //     Users.find({ username: req.params.uname },
    //     function(err, users) {
    //         if (err) throw err;
    //         res.send(users);
    //     });
    // });

    app.get('/api/users/:uname', (req, res) => 
        Users.find({ username: req.params.uname },
        (err, users) => {
            if (err) throw err;
            res.send(users);
        })
    );

    app.get('/api/user/:id', (req, res) => 

        Users.findById({ _id: req.params.id }, (err, user) => {
            if (err) throw err;
            res.send(user);
        })

    );

    app.get('/api/users', (req, res) => 
        Users.find({}, (err, users) => {
            var userMap = {};

            users.forEach((user) => userMap[user._id] = user );

            res.send(userMap);
        })
    );

    app.post('/api/user', (req, res) => {

        if (req.body.id) {
            Users.findByIdAndUpdate(req.body.id, { username: req.body.username, password: req.body.password,
                nurse: false, admin: false, updated_at: new Date}, (err, user) => {
                if (err) throw err;
                res.send('success');
            });
        }

        else {
            var newUser = Users({
                username: req.body.username,
                password: req.body.password,
                nurse: false,
                admin: false,
                created_at: new Date,
                updated_at: new Date
            });
            newUser.save((err, user) => {
                if (err) throw err;
                res.send('Success');
            });
        }

    });

    app.delete('/api/user', (req, res) => 

        Users.findByIdAndRemove(req.body.id, (err) => {
            if (err) throw err;
            res.send('SUCCESS');
        })
    );
}

// exports.create() = function()