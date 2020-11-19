const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DebateQuestionSchema = new Schema({
    tier: {type: String, required: true},
    question: {type: String, required: true}
});

module.exports = DebateQuestions = mongoose.model('DebateQuestions', DebateQuestionSchema, 'DebateQuestions');