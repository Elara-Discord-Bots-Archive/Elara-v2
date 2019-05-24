const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    userName: { type: String, default: "" },
    userID: { type: String, default: "" },
    list: { type: Array, default: [] }
});

module.exports = mongoose.model("todo", Schema);