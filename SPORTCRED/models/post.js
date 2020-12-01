const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    poster: {type: Schema.Types.ObjectId, ref: 'Profile'},
    postContent: { type: String, trim: true },
    postDate: {type: Date, default: Date.now},
    comments: [{
        commentContent: { type: String },
        commentDate: {type: Date, default: Date.now},
        commenter: {type: String}
    }],
    agree: [ {type: String} ],
    disagree: [ {type: String} ],
    username: {type: String}
});

module.exports = Post = mongoose.model('posts', PostSchema);