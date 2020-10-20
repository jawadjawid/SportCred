const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionnaireSchema = new Schema({
    "Favourite Sport":{
        type: String
    },
    "Age":{
        type: String
    },
    "Highest level of sport play":{
        type: String
    },
    "What sport would you like to know/learn about": {
        type: String
    },
    "Favourite sports team":{
        type: String
    }
});

module.exports = mongoose.model('Questionnaires', QuestionnaireSchema);