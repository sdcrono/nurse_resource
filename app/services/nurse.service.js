const Users = require('mongoose').model('Users'),
    Profiles = require('mongoose').model('NurseProfiles');

const _ = require('lodash');
    // jwt = require('jsonwebtoken');
    Q = require('q');

var service = {};
 
// service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.createUser = createUser;
service.updateUser = updateUser;
service.upsertProfile = upsertProfile;
// service.delete = _delete;
 
module.exports = service;

function getAll() {
    // let deferred = Q.defer();
 
    let promise = Users.find({}, (err, users) => {

                if (err) deferred.reject(err.name + ': ' + err.message);

                var userMap = {};

                users.forEach((user) => userMap[user._id] = user );
                users = _.map(users, function (user) {
                    return _.omit(user, 'hash');
                });
                deferred.resolve(users);
                // res.send(users);
            }).exec()
    return promise;
}

function userById() {
    let deferred = Q.defer();
    Users.find({ username: req.params.id },
            (err, users) => {
                if (err) throw err;
                res.send(users);
            })

}

function getById(_id) {
    let deferred = Q.defer();
 
    Users.findById({ _id: _id }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}

function createUser(username, password) {

    let newUser = Users({
        username: username,
        password: password,
        nurse: false,
        admin: false,
        created_at: new Date,
        updated_at: new Date,
        isDelete: false
    });

    let promise = newUser.save((err, user) => {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve('Success');
        // upsertProfile(username, firstname, lastname, email, phone, age, gender, address);
    });
    return deferred.promise;
}

function upsertProfile(username, firstname, lastname, email, phone, age, gender, address) {
    let deferred = Q.defer();

    Users.findOne({username: username}, (err, user) => {
        if(err){
            deferred.reject(err.name + ': ' + err.message);
        }
        var profile = {
            name: {
                first: firstname,
                last: lastname
            },
            email: email,
            phone: phone,
            age: age,	
            sex: gender,
            address: address,
            owner: user._id 
        }

        Profiles.findOneAndUpdate({owner: user._id}, profile, {upsert:true}, (err, doc) => {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve('Success2');
        });
    });
    return deferred.promise;
}

function updateUser(id, username, password, firstname, lastname, email, phone, age, gender, address) {
    let deferred = Q.defer();

    Users.findByIdAndUpdate(id, { username: username, password: password,
        nurse: false, admin: false, updated_at: new Date}, (err, user) => {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve('Success3');
        upsertProfile(username, firstname, lastname, email, phone, age, gender, address);
    });
    return deferred.promise;
}