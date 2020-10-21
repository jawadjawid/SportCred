const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionnaireSchema = new Schema({
    username:{
        type: String
    },
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
});

module.exports = mongoose.model('Questionnaires', QuestionnaireSchema);