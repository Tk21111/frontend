const mongoose = require('mongoose');
const { Editor, Admin } = require('../config/roles_list');
const Shema = mongoose.Schema;

const userShema = new Shema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    randnum: Number,
    refreshToken: String,
    no : Number
});

module.exports = mongoose.model('User', userShema);