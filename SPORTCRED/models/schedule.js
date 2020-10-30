const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    // Date format YYYY-MM-DD
    date: {
        type: String,
        match: /(\d{4})-(\d{2})-(\d{2})/, 
        required: true
    },

    winner: { 
        type: String, 
        required: true
    },

    teams: { 
        teamA: { 
            name: {type: String, required: true},
            logo: {type: String, required: true}
        },
        teamB: { 
            name: {type: String, required: true},
            logo: {type: String, required: true}
        }
    },

    round: {type: String}
});

module.exports = Schedule = mongoose.model('games', GameSchema, 'games');