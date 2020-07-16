const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema); 