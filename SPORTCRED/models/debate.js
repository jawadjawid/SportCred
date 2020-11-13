const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DebateSchema = new Schema({
    fanalyst: [{
        type: Schema.Types.ObjectId,
        ref: 'DebatePost'
    }],
    analyst: [{
        type: Schema.Types.ObjectId,
        ref: 'DebatePost'
    }],
    proAnalyst: [{
        type: Schema.Types.ObjectId,
        ref: 'DebatePost'
    }],
    expertAnalyst: [{
        type: Schema.Types.ObjectId,
        ref: 'DebatePost'
    }],
    date: {
        type: Date
    }
});

module.exports = Debate = mongoose.model('debate', DebateSchema);