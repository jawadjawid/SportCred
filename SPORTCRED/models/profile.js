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
        match: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
        required: true
    },
    userIcon: {
        type: String
    },
    about: {
        type: String
    },
    questionnaire: {
        favSport:{
            type: String
        },
        age:{
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
    ACSmetrics: {
        type: Schema.Types.ObjectId,
        ref: 'ACSmetrics'
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Posts"
    }]  
});

ProfileSchema.plugin(uniqueValidator);

module.exports = Profile = mongoose.model('profiles', ProfileSchema);