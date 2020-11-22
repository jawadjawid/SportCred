const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const triviaQuestionSchema = new Schema({
    question: {type: String},
    answer: {type: String},
    option1: {type: String},
    option2: {type: String},
    option3: {type: String},
    option4: {type: String}
});

module.exports = triviaQuestions = mongoose.model('triviaQuestions', triviaQuestionSchema, 'triviaQuestions')