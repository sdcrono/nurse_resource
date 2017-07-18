const Users = require('mongoose').model('Users'),
    Profiles = require('mongoose').model('Profiles'),
    NurseProfiles = require('mongoose').model('NurseProfiles');

const _ = require('lodash');
    jwt = require('jsonwebtoken')
    bcrypt = require('bcryptjs');
    Q = require('q');

var service = {};
 
// service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.getMetaById = getMetaById;
service.createUser = createUser;
service.createProfile = createProfile;
service.createNurseProfile = createNurseProfile;
service.updateUser = updateUser;
service.updateProfile = updateProfile;
service.updateNurseProfile = updateNurseProfile;
service.deleteUser = _deleteUser;
service.deleteProfile = _deleteProfile;
service.deactiveUser = deactiveUser;
service.activeUser = activeUser;
 
module.exports = service;



function getAll() {
    let deferred = Q.defer();
 
    Users.find({isDelete: false, role: "ROLE_Nurse"}, (err, users) => {

                if (err) deferred.reject(err.name + ': ' + err.message);

                var userMap = {};

                users.forEach((user) => userMap[user._id] = user );
                users = _.map(users, function (user) {
                    return _.omit(user, 'password');
                });
                deferred.resolve(users);
                // res.send(users);
            })
    return deferred.promise;
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
            deferred.resolve(_.omit(user, 'password'));
        } else {
            // user not found
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}

function getMetaById(_id) {
    let deferred = Q.defer();
 
    NurseProfiles.findById({ owner: _id }, function (err, profile) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (profile) {
            // return user (without hashed password)
            deferred.resolve(profile);
        } else {
            // user not found
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}

function createUser(userParam) {
    let deferred = Q.defer();

    Users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                    Profiles.findOne(
                        { email: userParam.email },
                        function (err, profile) {
                            if (err) deferred.reject(err.name + ': ' + err.message);
                
                            if (profile) {
                                // username already exists
                                deferred.reject('Email "' + userParam.email + '" is already taken');
                            } else {
                                let pass = bcrypt.hashSync(userParam.password, 10);
                                let newUser = Users({
                                    username: userParam.username,
                                    password: pass,
                                    location: {
                                        latitude: userParam.lat,
                                        longitude: userParam.lng
                                    },
                                    // nurse: false,
                                    // admin: false,
                                    role: "ROLE_Nurse",
                                    created_at: new Date,
                                    updated_at: new Date,
                                    isDelete: false
                                });
                                newUser.save((err, user) => {
                                    if (err) deferred.reject(err.name + ': ' + err.message);
                                    // deferred.resolve('Success');
                                    createProfile(userParam).then(
                                        deferred.resolve('Success5')
                                    ).catch(err => {
                                        deferred.reject(err);
                                    });
                                    createNurseProfile(userParam).then(
                                        deferred.resolve('Success6')
                                    ).catch(err => {
                                        deferred.reject(err);
                                    });
                                });
                                
                            }
                        });
            }
        });
        return deferred.promise;


}

function createProfile(userParam) {
    let deferred = Q.defer();

    Users.findOne({username: userParam.username}, (err, user) => {
        if(err){
            deferred.reject(err.name + ': ' + err.message);
        }
        let profile = new Profiles ({
            name: {
                first: userParam.firstname,
                last: userParam.lastname
            },
            email: userParam.email,
            phone: userParam.phone,
            age: userParam.age,	
            sex: userParam.gender,
            address: userParam.address,
            owner: user._id 
        })

        // Profiles.findOneAndUpdate({owner: user._id}, profile, {upsert:true}, (err, doc) => {
        //     if (err) deferred.reject(err.name + ': ' + err.message);
        //     deferred.resolve('Success2');
        // });
        profile.save((err, profile) => {
            if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve('Success2');
                Users.findOneAndUpdate({username: userParam.username}, {profile: profile._id}, (err, user) => {
                    if (err) deferred.reject(err.name + ': ' + err.message);
                     deferred.resolve('Success4');
                });
        });
    });
    return deferred.promise;
}

function createNurseProfile(userParam) {
    let deferred = Q.defer();

    Users.findOne({username: userParam.username}, (err, user) => {
        if(err){
            deferred.reject(err.name + ': ' + err.message);
        }
        let profile = new NurseProfiles ({
            certification: userParam.certification,
            career: userParam.career,
            working_place: userParam.working_place,
            address: userParam.address,
            age: userParam.age,	
            sex: userParam.gender,
            rate: userParam.rate,
            retribution: userParam.retribution,
            owner: user._id 
        })

        // Profiles.findOneAndUpdate({owner: user._id}, profile, {upsert:true}, (err, doc) => {
        //     if (err) deferred.reject(err.name + ': ' + err.message);
        //     deferred.resolve('Success2');
        // });
        profile.save((err, profile) => {
            if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve('Success2');
                Users.findOneAndUpdate({username: userParam.username}, {nurseprofile: profile._id}, (err, user) => {
                    if (err) deferred.reject(err.name + ': ' + err.message);
                     deferred.resolve('Success4');
                });
        });
    });
    return deferred.promise;
}

function updateUser(userParam) {
    let deferred = Q.defer();

    Users.findOne({_id: userParam.id}, (err, user) => {
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }

        var info = {
            username: userParam.username,
            location: {
                latitude: userParam.lat,
                longitude: userParam.lng
            }
        };

        if(userParam.password)
            info.password = bcrypt.hashSync(userParam.password, 10);

        user.update(info, (err) => {
            if (err) { deferred.reject(err.name + ': ' + err.message); }
        });
    });
    return deferred.promise;


}

function updateNurseProfile(userParam) {
    let deferred = Q.defer();
    // let profile = Profiles.find({owner: id});
    NurseProfiles.findOne({owner: userParam.id}, (err, profile) => {
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }   
        let set = {
            certification: userParam.certification,
            career: userParam.career,
            working_place: userParam.working_place,
            address: userParam.address,
            age: userParam.age,	
            sex: userParam.gender,
            rate: userParam.rate,
            retribution: userParam.retribution
        }

        profile.update(set, (err, doc) => {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve('Success2');
        });
    });

    return deferred.promise;
}

function updateProfile(userParam) {
    let deferred = Q.defer();
    // let profile = Profiles.find({owner: id});
    Profiles.findOne({owner: userParam.id}, (err, profile) => {
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }   
        let set = {
            name: {
                first: userParam.firstname,
                last: userParam.lastname
            },
            email: userParam.email,
            phone: userParam.phone,
            age: userParam.age,	
            sex: userParam.gender,
            address: userParam.address
        }

        profile.update(set, (err, doc) => {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve('Success2');
        });
    });

    return deferred.promise;
}

function _deleteUser(id) {

    let deferred = Q.defer();

    Users.findByIdAndRemove(id, (err) => {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve('SUCCESS');
    })
    return deferred.promise;
}

function _deleteProfile(id) {

    let deferred = Q.defer();

    Profiles.findByIdAndRemove(id, (err) => {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve('SUCCESS');
    })
    return deferred.promise;
}

function deactiveUser(id) {

    let deferred = Q.defer();

    Users.findOne({_id: id}, (err, user) => {
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }

        let info = {
            isDelete: true
        };

        user.update(info, (err) => {
            if (err) { deferred.reject(err.name + ': ' + err.message); }
            deferred.resolve('SUCCESS');
        });

    });
    return deferred.promise;
}

function activeUser(id) {

    let deferred = Q.defer();

    Users.findOne({_id: id}, (err, user) => {
        if (err){
            deferred.reject(err.name + ': ' + err.message);
        }

        let info = {
            isDelete: false
        };

        user.update(info, (err) => {
            if (err) { deferred.reject(err.name + ': ' + err.message); }
            deferred.resolve('SUCCESS');
        });

    });
    return deferred.promise;
}