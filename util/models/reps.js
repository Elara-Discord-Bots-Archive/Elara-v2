const mongoose = require("mongoose");

const moneySchema = mongoose.Schema({
    userTag: String,
    userID: String,
    reps: Number
});

module.exports = mongoose.model("reps", moneySchema);