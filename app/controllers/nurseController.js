const nurseService = require('../services/nurse.service'),
    userService = require('../services/user.service');

exports.getAll = (req, res, next) => 
        nurseService.getAll()
            .then(users => {
                res.send(users);
            })
            .catch(err => {
                res.status(400).send(err);
            })