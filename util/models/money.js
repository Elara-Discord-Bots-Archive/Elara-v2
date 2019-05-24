const mongoose = require("mongoose");

const moneySchema = mongoose.Schema({
    userTag: String,
    userID: String,
    guildID: String,
    coins: Number
});

module.exports = mongoose.model("coins", moneySchema);