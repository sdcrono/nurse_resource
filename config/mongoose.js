const config = require('./config'),
	mongoose = require('mongoose');
	

module.exports = function(){
	let db = mongoose.connect(config.db);
	require('../app/models/nurseProfileModel');
	require('../app/models/permissionModel');
    require('../app/models/profileModel');
    require('../app/models/roleModel');
    require('../app/models/serviceModel');
    require('../app/models/userModel');
	return db;
};