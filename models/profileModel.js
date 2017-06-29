var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var profileSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
	email: {
        type: String,
        lowercase: true,
        unique: true,
        dropDups: true 
    },
	phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{11}/.test(v);
          },
          message: '{VALUE} is not a valid phone number!'
        }
    },
	age: Number,	
	sex: String,
	address: String,
	owner: {
        type: Schema.Types.ObjectId,
        unique: true	
    }
});

var Profiles = mongoose.model('Profiles', profileSchema);

module.exports = Profiles;