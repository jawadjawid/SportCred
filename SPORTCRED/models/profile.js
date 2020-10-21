const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    username: {
        type: String
    },
    password:{
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    fullName: {
        type: String
    },
    DOB: {
        type: String,
        match: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    },
    picture: {
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

module.exports = Profile = mongoose.model('profiles', ProfileSchema);