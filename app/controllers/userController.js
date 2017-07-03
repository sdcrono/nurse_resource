var Users = require('../models/userModel'),
    Profiles = require('../models/profileModel');

exports.userById = (req, res) => 
        Users.find({ username: req.params.id },
        (err, users) => {
            if (err) throw err;
            res.send(users);
        })

exports.list = (req, res) => 
        Users.find({}, (err, users) => {
            var userMap = {};

            users.forEach((user) => userMap[user._id] = user );

            res.send(userMap);
        })

exports.upsert = (req, res) => {

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
                updated_at: new Date,
                isDelete: true
            });
            newUser.save((err, user) => {
                if (err) throw err;
                res.send('Success');
            });

            Users.findOne({username: req.body.username}, (err, user) => {
                    if(err){
                        return handleError(err);
                    }
                    var profile = {
                        name: {
                            first: req.body.first,
                            last: req.body.last
                        },
                        email: req.body.email,
                        phone: req.body.phone,
                        age: req.body.age,	
                        sex: req.body.gender,
                        address: req.body.address,
                        owner: user._id 
                    }

                    Profiles.findOneAndUpdate({owner: user._id}, profile, {upsert:true}, (err, doc) => {
                        if (err) return handleError(err);
                        // return res.send("succesfully saved");
                    });
                });
        }

    }

exports.insert = (req, res) => {

        // if (req.body.id) {
        //     res.send('the username is existing');     
        // }

        // else {
        var newUser = Users({
            username: req.body.username,
            password: req.body.password,
            nurse: false,
            admin: false,
            created_at: new Date,
            updated_at: new Date,
            isDelete: true
        });
        newUser.save((err, user) => {
            if (err) throw err;
            res.send('Success');
        });

        Users.findOne({username: req.body.username}, (err, user) => {
                if(err){
                    return handleError(err);
                }
                var profile = {
                    name: {
                        first: req.body.first,
                        last: req.body.last
                    },
                    email: req.body.email,
                    phone: req.body.phone,
                    age: req.body.age,	
                    sex: req.body.gender,
                    address: req.body.address,
                    owner: user._id 
                }

                Profiles.findOneAndUpdate({owner: user._id}, profile, {upsert:true}, (err, doc) => {
                    if (err) return handleError(err);
                    // return res.send("succesfully saved");
                });
            });
        // }

    }

exports.delete = (req, res) => 

        Users.findByIdAndRemove(req.body.id, (err) => {
            if (err) throw err;
            res.send('SUCCESS');
        })