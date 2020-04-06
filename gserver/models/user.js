const mongo = require('mongoose');
const Schema = mongo.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        default: ""
    },
    last_name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    full_name: {
        type: String,
        default: ""
    },
    password: {
        type: String
    },
    followers: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    },
    tweets: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongo.model('User', userSchema);