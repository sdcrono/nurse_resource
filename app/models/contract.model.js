const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contractSchema = new Schema({
    userId: Schema.Types.ObjectId,
    nurseId: Schema.Types.ObjectId,
    created_at: Date,
    end_at: Date
});

var Contracts = mongoose.model('Contracts', contractSchema);

module.exports = Contracts;