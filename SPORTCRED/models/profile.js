const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    username: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    DOB: {
        type: String
    },
    picture: {
        type: String
    },
    about: {
        type: String
    },
    questionnaire: {
        type: Schema.Types.ObjectId,
        ref: 'Questionnarie'
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