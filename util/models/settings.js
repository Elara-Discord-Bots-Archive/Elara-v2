const mongoose = require("mongoose");
const settings = mongoose.Schema({
    guildName: String,
    guildID: String,
    prefix: String,
    logchannel: String,
    reportschannel: String,
    vclogs: String,
    actionlog: String,
    toggles: {user: Boolean, mod: Boolean, messages: Boolean, server: Boolean, joins: Boolean}
});
module.exports = mongoose.model("settings", settings);