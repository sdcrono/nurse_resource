var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({    
	username: {
        type: String,
        required: [true, 'Username required'],
        get: username => username,
        set: username => username,
        unique: true 
    },
	password: {
        type: String,
        required: [true, 'Password required']
    },
    nurse: Boolean,	
    admin: Boolean,
    profile: [Schema.Types.Mixed],
    nurse_profile: [Schema.Types.Mixed],
    created_at: Date,
    updated_at: {
        type: Date,
        default: Date.now
    }
});

var Users = mongoose.model('Users', userSchema);

module.exports = Users;