const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todayQuestionSchema = new Schema({
    fanalyst: {
        type: String, 
        ref: 'DebateQuestions'
    },
    analyst: {
        type: String, 
        ref: 'DebateQuestions'
    },
    proanalyst: {
        type: String, 
        ref: 'DebateQuestions'
    },
    expertanalyst: {
        type: String, 
        ref: 'DebateQuestions'
    },
    lastUpdatedDate: {type: Date}
});

module.exports = TodayQuestions = mongoose.model('fixedQuestions', todayQuestionSchema, 'fixedQuestions');