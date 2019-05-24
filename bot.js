const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const chalk = require('chalk');
const superagent = require('superagent');
// Required The packages

const Commando = require("./util/Commando");
const config = require('./util/config.js');
const util = require('./util/util.js');
const functions = require('./util/functions.js');
mongoose.connect(config.mongodb, { useNewUrlParser: true })
const Settings = require("./util/models/settings.js"),
      Money = require('./util/models/money.js'),
      Throws = require('./util/models/throws.js'),
      Warnings = require('./util/models/warnings.js');
const photos = require('./util/photos.js');
// Required The files
const client = new Commando.CommandoClient({
    commandPrefix: "e!",
    owner: ['288450828837322764', "391529339214364674", "440810964061913119"],
    invite: "https://discord.gg/qafHJ63",
    commandEditableDuration: 100000,
    unknownCommandResponse: false,
    fetchAllMembers: true
});
//Start of Client Short Cuts.
client.login(config.token);
client.error = functions.error;
client.throw = Throws;
client.db = Settings;
client.warns = Warnings;
client.owner =  functions.owner;
client.coins = functions.coins; 
client.functions = functions; 
client.dbcoins = Money;
client.config = config;
client.chalk = chalk;
client.util = util;
client.logger = functions.logger;
client.log = functions.logchannel;
client.vclogs = functions.vclogs;
client.photos = photos
client.perms = functions.perms;
client.actionlog = functions.actionlog;
client.superagent = superagent;
client.stats = functions.stats;
//End of Client Short Cuts.
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    console.log(`[Events] Loaded ${files.length} Events!`)
    files.forEach(file => {
        client.on(file.split(".")[0], (...args) => require(`./events/${file}`).run(client, ...args));
    });
});
//Fetching/Loading the events from the events folder...
process.on('unhandledRejection', error => {
    console.error(`UnhandledRejection: \n${error.stack}`);
    let e = new Discord.RichEmbed()
        .setColor(`#FF0000`)
        .setAuthor(client.user.tag, client.user.displayAvatarURL)
        .setDescription(error.stack)
        .setTimestamp()
        .setTitle(`Unhandled Rejection`)
    client.channels.get(config.log).send(e)
});
process.on('uncaughtException', error => {
    console.error(`UncaughtException: \n${error.stack}`);
    let e = new Discord.RichEmbed()
        .setColor(`#FF0000`)
        .setAuthor(client.user.tag, client.user.displayAvatarURL)
        .setDescription(error.stack)
        .setTimestamp()
        .setTitle(`Uncaught Exception`)
    client.channels.get(config.log).send(e)
});
//Error Handling.


// Client settings etc
client.registry   
    .registerDefaultTypes()
    .registerGroups([
        ["admin", "Admin Commands"],
        ["mod", "Moderator Commands"],
        ["info", "Information Commands"],
        ['docs', 'Docs Commands'],
        ["server", "Server Commands"],
        ["fun", "Fun Commands"],
        ["image", "Image Commands"],
        ["special", "Special Commands"],
        ["owner", "Bot Owner Commands"],
        ["owner/misc", "Bot Owner Misc Commands"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false,
        prefix: false,
        ping: false,
        eval_: false,
        commandState: true
    })
    .registerCommandsIn(path.join(__dirname, 'commands'))
    .registerCommandsIn(path.join(__dirname, 'commands/Bot Owner Commands/'))
    .registerCommandsIn(path.join(__dirname, 'commands/Fun Commands/'))
    .registerCommandsIn(path.join(__dirname, 'commands/Info Commands/'))
    .registerCommandsIn(path.join(__dirname, 'commands/Moderation Commands/'))
