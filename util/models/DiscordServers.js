const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    clientID: String,
    type: String,
    invites: { type: Array, default: [] }
});

module.exports = mongoose.model("Discord Invites", Schema);