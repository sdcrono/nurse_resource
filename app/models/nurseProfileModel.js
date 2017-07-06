const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var nurseProfileSchema = new Schema({
    certification: [String],
    rate: Number,
    retribution: Number,
    history: String,
    owner: Schema.Types.ObjectId
});

var NurseProfiles = mongoose.model('NurseProfiles', nurseSchema);

module.exports = NurseProfiles;