const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var roleSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
	description: String,
    permissions: []

});

var Roles = mongoose.model('Roles', roleSchema);

module.exports = Roles;