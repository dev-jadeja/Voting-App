const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    question: {
        type: String,
        required: true,
    },
    choices: [
        {
            option: {
                type: String,
                required: true,
            },
            votes: {
                type: Number,
                default: 0
            }
        }   
    ],
    voters: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    declare_result: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Poll = mongoose.model('poll', PollSchema);