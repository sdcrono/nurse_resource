// const Users = require('../models/userModel'),
// const Users = require('mongoose').model('Users'),

//     Profiles = require('../models/profile.model');
const contractService = require('../services/contract.service');

var getErrorMessage = function(err){
	var message = '';
	if(err.code){
		switch(err.code){
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	}
	else{
		for(var errName in err.errors){
			if(err.errors[errName].message)
				message = err.errors[errName].message;
		}
	}
	
	return message;
};

// exports.getById = (req, res) => 
//         userService.getById(req.params.id)
//         .then(users => {
//             res.send(users);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         })    

exports.getAll = (req, res, next) => 
        contractService.getAll()
            .then(contracts => {
                res.send(contracts);
            })
            .catch(err => {
                res.status(400).send(err);
            })

exports.upsert = (req, res, next) => {

        if (req.body.id) {

            // userService.updateUser(req.body)
            //     .then(result => {
            //         res.send(result);
            //     })
            //     .catch(err => {
            //         res.status(400).send(err);
            //     });
            // userService.updateProfile(req.body)
            //     .then(result => {
            //         res.send(result);
            //     })
            //     .catch(err => {
            //         res.status(400).send(err);
            //     });
        }

        else {
            contractService.createContract(req.body)
                .then(result => {
                    res.send(result);
                })                
                .catch(err => {
                    res.status(400).send(err);
                })                  
        }

    }

// exports.delete = (req, res, next) => {
//     userService.deleteUser(req.body.id)
//         .then(result => {
//             res.send(result);
//         })                
//         .catch(err => {
//             res.status(400).send(err);
//         })
// }
        

// exports.deactive = (req, res, next) => 
//         userService.deactiveUser(req.body.id)        
//         .then(result => {
//             res.send(result);
//         })                
//         .catch(err => {
//             res.status(400).send(err);
//         })

// exports.active = (req, res, next) => 
//         userService.activeUser(req.body.id)        
//         .then(result => {
//             res.send(result);
//         })                
//         .catch(err => {
//             res.status(400).send(err);
//         })

exports.search = (req, res) => {
};


