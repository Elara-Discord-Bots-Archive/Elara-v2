const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    clientName: { type: String, default: "" },
    clientID: { type: String, default: "" },
    list: { type: Array, default: [] }
});

module.exports = mongoose.model("blacklisted-servers", Schema);