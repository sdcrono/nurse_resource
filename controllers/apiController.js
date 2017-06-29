var Users = require('../models/userModel')

module.exports = function(app) {

    app.get('/api/users/:uname', function(req, res) {
        Users.find({ username: req.params.uname },
        function(err, users) {
            if (err) throw err;
            res.send(users);
        });
    });

    app.get('/api/user/:id', function(req, res) {

        Users.findById({ _id: req.params.id }, function(err, user) {
            if (err) throw err;
            res.send(user);
        });

    });

    app.post('/api/user', function(req, res) {

        if (req.body.id) {
            Users.findByIdAndUpdate(req.body.id, { username: req.body.username, password: req.body.password,
                nurse: false, admin: false, updated_at: new Date}, function(err, user) {
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
            newUser.save(function(err, user) {
                if (err) throw err;
                res.send('Success');
            });
        }

    });

    app.delete('/api/user', function(req, res) {

        Users.findByIdAndRemove(req.params.id, function(err) {
            if (err) throw err;
            res.send('SUCCESS');
        });
    });
}