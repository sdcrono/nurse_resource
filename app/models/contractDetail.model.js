const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contractDetailSchema = new Schema({
    dates: [Number],
    // startHour: TimeRanges,
    // endHour: TimeRanges,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'	
    }
});

var ContractDetails = mongoose.model('ContractDetails', contractDetailSchema);

module.exports = ContractDetails;