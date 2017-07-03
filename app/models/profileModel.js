var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var profileSchema = new Schema({
    name: {
        first: String,
        last: { type: String, trim: true }
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
	age: { type: Number, min: 0 },	
	sex: String,
	address: String,
	owner: {
        type: Schema.Types.ObjectId,
        unique: true	
    }
});

profileSchema.virtual('fullname').get(function() {
    return this.first + " " + this.last;
});

profileSchema.virtual('fullname').set(function (name) {  
  var split = name.split(' ');
  this.first = split[0];
  this.last = split[1];
});

var Profiles = mongoose.model('Profiles', profileSchema);

module.exports = Profiles;