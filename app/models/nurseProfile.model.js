const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var nurseProfileSchema = new Schema({
    certification: [String],
    career: {
        type: String,
        enum: ['LPN', 'RN'] //Licensed Practical Nurse and Registered Nurse
    },
    working_place: String,
    address: String,
    age: { type: Number, min: 22 },
    sex: String,	
    rate: Number,
    retribution: Number,
    history: String,
    owner: Schema.Types.ObjectId
});

var NurseProfiles = mongoose.model('NurseProfiles', nurseProfileSchema);

module.exports = NurseProfiles;