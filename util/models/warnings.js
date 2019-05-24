const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    userID: {type: String, default: ""},
    userTag: {type: String, default: ""},
    guildID: {type: String, default: ""},
    guildName: {type: String, default: ""},
    warns: { type: Array, default: [] }
});

module.exports = mongoose.model("Warnings", Schema);