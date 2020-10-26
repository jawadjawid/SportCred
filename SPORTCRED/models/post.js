const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    poster: {type: Schema.Types.ObjectId, ref: 'Profile'},
    postContent: { type: String },
    postDate: Date
});

module.exports = Post = mongoose.model('posts', PostSchema);