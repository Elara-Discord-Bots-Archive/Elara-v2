const mongoose = require("mongoose");

const moneySchema = mongoose.Schema({
    userTag: String,
    userID: String,
    vcoins: Number
});

module.exports = mongoose.model("valcoins", moneySchema);
