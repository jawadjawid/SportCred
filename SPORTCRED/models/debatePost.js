const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DebatePostSchema = new Schema({
    username: {type: String}, 
    poster: {type: Schema.Types.ObjectId, ref: 'Profile'},
    postContent: { type: String, trim: true },
    postDate: {type: Date, default: Date.now},
    agreeance: [{agreer: {type: String}, score: {type: Number}}]
});

module.exports = DebatePost = mongoose.model('debatePost', DebatePostSchema);