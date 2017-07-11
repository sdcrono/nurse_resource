const config = require('./config'),
	mongoose = require('mongoose');
	

module.exports = function(){
	
	mongoose.Promise = require('q').Promise;
	let db = mongoose.connect(config.db);

	// CONNECTION EVENTS
	// When successfully connected
	mongoose.connection.on('connected', function () {  
	console.log('Mongoose default connection open to ' + config.db);
	}); 

	// If the connection throws an error
	mongoose.connection.on('error',function (err) {  
	console.log('Mongoose default connection error: ' + err);
	}); 

	// When the connection is disconnected
	mongoose.connection.on('disconnected', function () {  
	console.log('Mongoose default connection disconnected'); 
	});

	// If the Node process ends, close the Mongoose connection 
	process.on('SIGINT', function() {  
		mongoose.connection.close(function () { 
			console.log('Mongoose default connection disconnected through app termination'); 
			process.exit(0); 
		}); 
	});

	require('../app/models/nurseProfileModel');
	require('../app/models/permissionModel');
    require('../app/models/profileModel');
    require('../app/models/roleModel');
    require('../app/models/serviceModel');
    require('../app/models/user.model');
	return db;
};