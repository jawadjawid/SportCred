const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    teams: { type: String, 
        match: /[a-zA-Z0-9\s-'()]+ [vs]+ [a-zA-Z0-9\s-'()]+/,
        required: true },
    date: { type: String, 
        match: /(\d{4})-(\d{2})-(\d{2})/, 
        required: true },
    time: { type: String, 
        match: /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/,
        required: true },
    venue: { type: String, required: true}
});

module.exports = Schedule = mongoose.model('schedules', ScheduleSchema);