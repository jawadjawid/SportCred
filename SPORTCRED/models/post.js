const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    poster: {type: Schema.Types.ObjectId, ref: 'Profile'},
    postContent: { type: String },
    postDate: {type: Date, default: Date.now}
});

module.exports = Post = mongoose.model('posts', PostSchema);