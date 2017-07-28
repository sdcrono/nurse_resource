const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contractSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'	
    },
    nurseId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'	
    },
    created_at: Date,
    end_at: Date,
    patientName: String,
    patientAge: String,
    address: String,
    location: {
        latitude: Number,
        longitude: Number
    },    
    status: {
        type: String,
        enum: ['check', 'approve', 'reject']
    },    
    detail: {
        type: Schema.Types.ObjectId,
        ref: 'ContractDetails'	
    }
});

var Contracts = mongoose.model('Contracts', contractSchema);

module.exports = Contracts;