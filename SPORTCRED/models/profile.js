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
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    fullName: {
        type: String
    },
    dateOfBirth: {
        type: String,
        match: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    },
    userIcon: {
        type: String
    },
    about: {
        type: String
    },
    questionnaire: {
        type: Schema.Types.ObjectId,
        ref: 'Questionnaire'
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