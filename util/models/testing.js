const mongoose = require('mongoose');
const users = new mongoose.Schema({
    userTag: String,
    userID: String,
    // User databases
    reps: Number,
    hearts: Number,
    todos: Array,
    custom: {
        image: String,
        desc: String,
        color: String
    },
    afk: {
        en: Boolean,
        message: String
    }
});
module.exports = mongoose.model("user-db", users)
