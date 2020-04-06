const mongo = require('mongoose');
const Schema = mongo.Schema;

const tweetSchema = new Schema({
    message: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    // user_id: String
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    parent_id: String
});

module.exports = mongo.model('Tweet', tweetSchema);