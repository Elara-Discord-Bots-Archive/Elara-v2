const mongoose = require("mongoose");

const statsSchema = mongoose.Schema({
    clientTag: String,
    clientID: String,
    cmdrun: Number,
    msgrun: Number,
    guildsjoin: Number,
    guildsleft: Number,
    restarts: Number,
    shutdowns: Number,
    starts: Number
});

module.exports = mongoose.model("stats", statsSchema);