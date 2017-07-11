const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contractSchema = new Schema({
    userId: Schema.Types.ObjectId,
    NurseId: Schema.Types.ObjectId,
    created_at: Date,
    end_at: Date
});

var NurseProfiles = mongoose.model('NurseProfiles', nurseProfileSchema);

module.exports = NurseProfiles;