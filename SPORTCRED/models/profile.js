const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const ProfileSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password:{
        type: String,
        minLength: 8,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        match: /^([0-9]{3}[0−9]3\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/,
        required: true
    },
    email: {
        type: String,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        //match : '^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$\n',
        match: /(\d{4})-(\d{2})-(\d{2})/,
        required: true
    },
    userIcon: {
        type: String,
        default: ""
    },
    about: {
        type: String
    },
    questionnaire: {
        favSport:{
            type: String
        },
        levelPlayed:{
            type: String
        },
        sportToLearn: {
            type: String
        },
        favTeam:{
            type: String
        }
    },
    ACSScore: {
        type: Number,
        default: 200
    },
    ACSHistoryReport: [{
        ACSStart: {
            type: Number,
            default: 0
        },
        ACSEnd: {
            type: Number,
            default: 0
        },
        activity: {
            type: String,
            default: ""
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }],
    ACSScoreChange: {
        type: Boolean,
        default: false
    },
    lastDebateCompleted: {
        type: Date,
        default: Date.now
    },
    lastDebatePrompt: {
        type: Date,
        default: Date.now
    },
    predictions: [{
        gameId: {
            type: Schema.Types.ObjectID,
        },
        predictedWinner: {
            type: String
        }
    }],
    radarList: [{
        username: {
            type: String
        },
        userIcon: {
            type: String
        }
    }]
});

ProfileSchema.plugin(uniqueValidator);

module.exports = Profile = mongoose.model('profiles', ProfileSchema);