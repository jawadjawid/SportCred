const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DebatePostSchema = new Schema({
    poster: {type: Schema.Types.ObjectId, ref: 'Profile'},
    postContent: { type: String, trim: true },
    postDate: {type: Date, default: Date.now},
    agreeance: [ {type: String} ]
});

module.exports = DebatePost = mongoose.model('debatePost', DebatePostSchema);