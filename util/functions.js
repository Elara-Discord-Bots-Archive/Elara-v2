const re = require('discord.js').RichEmbed;
const chalk = require('chalk');
const Money = require('../util/models/money.js');
const Stats = require('../util/models/stats.js');
const Settings = require('../util/models/settings.js');
//Requirements.

const user = async function(client, guild, embed){
    Settings.findOne({guildID: guild.id}, async(err, db) => {
        if(!db){
            return console.log(`No Database found in ${guild.name}!`)
        }else{
            if(db.toggles.user !== false){
                let logs = guild.channels.get(db.logchannel)
                if(!logs) return;
                logs.send(embed)
            }else{
                return;
            }
        }
    })
}
const server = async function(client, guild, embed){
    Settings.findOne({guildID: guild.id}, async(err, db) => {
        if(!db){
            return console.log(`No Database found in ${guild.name}!`)
        }else{
            if(db.toggles.server !== false){
                let logs = guild.channels.get(db.logchannel)
                if(!logs) return;
                logs.send(embed)
            }else{
                return;
            }
        }
    })
};
const mod = async function(client, guild, embed){
    Settings.findOne({guildID: guild.id}, async(err, db) => {
        if(!db){
            return console.log(`No Database found in ${guild.name}!`)
        }else{
            if(db.toggles.mod !== false){
                let logs = guild.channels.get(db.logchannel)
                if(!logs) return;
                logs.send(embed)
            }else{
                return;
            }
        }
    })
};
const messages = async function(client, guild, embed){
    Settings.findOne({guildID: guild.id}, async(err, db) => {
        if(!db){
            return console.log(`No Database found in ${guild.name}!`)
        }else{
            if(db.toggles.messages !== false){
                let logs = guild.channels.get(db.logchannel)
                if(!logs) return;
                logs.send(embed)
            }else{
                return;
            }
        }
    })
};
const joins = async function(client, guild, embed){
    Settings.findOne({guildID: guild.id}, async(err, db) => {
        if(!db){
            return console.log(`No Database found in ${guild.name}!`)
        }else{
            if(db.toggles.joins !== false){
                let logs = guild.channels.get(db.logchannel)
                if(!logs) return;
                logs.send(embed)
            }else{
                return;
            }
        }
    })
}
const error = async function(client, msg, error){
    let e = new re()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
    .setColor(client.util.colors.red)
    .setDescription(error)
    .setTimestamp()
    .setTitle(`ERROR`)
    msg.channel.send(e)
}
const embed = async function(client, message, title, desription){
let e = new re()
e.setAuthor(message.author.tag, message.author.displayAvatarURL);
e.setFooter(client.user.tag, client.user.displayAvatarURL);
e.setColor(`RANDOM`);
if(title){
    e.setTitle(title);
}
if(desription){
    e.setDescription(desription);
}
message.channel.send(e)
}
const stats = async function(client, cmd, msg, guildjoin, guildleft, restarts, shutdowns, starts){
    Stats.findOne({clientID: client.user.id}, async(err, db) => {
        if(db){
        if(cmd){
            db.cmdrun = db.cmdrun + 1
        }
        if(msg){
            db.msgrun = db.msgrun + 1
        }
        if(guildjoin){
            db.guildsjoin = db.guildsjoin + 1
        }
        if(guildleft){
            db.guildsleft = db.guildsleft + 1
        }
        if(restarts){
            db.restarts = db.restarts + 1
        }
        if(shutdowns){
            db.shutdowns = db.shutdowns + 1
        }
        if(starts){
            db.starts = db.starts + 1
        }
        db.save().catch(err => console.log(err))
    }
    });
}
const owner = function (client, message) {
    let e = new re()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setColor(`#FF0000`)
        .setTitle(`INFO`)
        .setThumbnail(`https://vgy.me/1SuBGQ.gif`)
        .setDescription(`You have to be the Bot Owner to run this command!`)
    if (!client.isOwner(message.author.id)) return message.replyEmbed(e).then(m => {
        message.delete(10000).catch()
        console.log(chalk.hex("#00F7CE")(`[Bot Owner Command Alert]`) + ` ${message.author.tag} (${message.author.id}) has tried to run a bot owner command`)
        m.delete(10000).catch()
        let e = new re()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTitle(`[Bot Owner Command]`)
        .setColor(`#FF0000`)
        .setDescription(`
        **User:** ${message.author} \`@${message.author.tag}\` (${message.author.id})
        `)
        e.setTimestamp()
        e.setThumbnail(message.author.displayAvatarURL)
        if(message.guild){
            e.setDescription(`
            **User:** ${message.author} \`@${message.author.tag}\` (${message.author.id})
            **Channel:** ${message.channel} \`#${message.channel}\` (${message.channel.id})
            **Server:** ${message.guild.name} (${message.guild.id})
            `)
            e.setThumbnail(message.guild.iconURL)
        }
        if(message.channel.type === "dm"){
            e.addField(`Channel Type`, `DM`)
        }
        
        client.channels.get(client.config.log).send(e)
    })
}
const coins = function (client, message) {
    if (message.author.bot) return;
    let addcoins = Math.ceil(Math.random() * 25);
    Money.findOne({ userID: message.author.id, guildID: message.guild.id }, (err, db) => {
        if (message.author.bot) return;
        if (err) console.log(err)
        if (!db) {
            const newdb = new Money({
                userTag: message.author.tag,
                userID: message.author.id,
                guildID: message.guild.id,
                coins: addcoins
            });
            newdb.save().catch(err => console.log(err));
        } else {
            db.coins = db.coins + addcoins;
            db.save().catch(err => console.log(err));
        }
    });
}
const perms = function (client, message, perms) {
    let e = new re()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setColor(`#FF0000`)
        .setTitle(`INFO`)
        .setThumbnail(`https://vgy.me/1SuBGQ.gif`)
        .setDescription(`You need \`${perms.replace("_", ' ')}\` permission to run this command!`)
    if (!message.member.hasPermission(perms) && !client.isOwner(message.author.id)) return message.channel.send(e).then(m => m.delete(10000).catch())
}
const logger = async function (client, type, err, msg, ch) {
    let e = new re()
        .setColor(`#FF0000`)
        .setTitle(`COMMAND ERROR`)
        .setDescription(err)
        .setTimestamp()
    if(type){
        e.addField(`Server`, `**Guild: **${type.name} (${type.id})`)
    }else{
    e.addField(`Type`, `DM`)
    }
    if(ch){
        e.addField(`Error Channel`, `**Channel: **${ch} \`#${ch.name}\` (${ch.id})`)
    }
    if (msg) {
        e.addField(`Member`, `**User: **${msg.author} \`@${msg.author.tag}\` (${msg.author.id})`)
    }
    client.channels.get(client.config.log).send(e)
    await console.log(chalk.default.redBright(`Logger error:`) + ` Guild: ${type.name} (${type.id}), Channel: ${ch.name} (${ch.id}), User: ${msg.author.tag} (${msg.author.id})\n\n${err}`)
}
const logchannel = function (client, type, embed) {
    client.db.findOne({ guildID: type.id }, (err, settings) => {
        if (err) console.log(err);
        if (settings) {
            if (settings.logchannel == "") return;
            let modlogs = type.channels.get(settings.logchannel);
            if (!modlogs) return;
            modlogs.send(embed)
        }
    });
}
const vclogs = function (client, guild, embed) {
    client.db.findOne({ guildID: guild.id }, async (err, settings) => {
        if (err) console.log(err)
        if (settings) {
            if (settings.vclogs == "") return;
            let vclogs = guild.channels.get(settings.vclogs);
            if (!vclogs) return;
            vclogs.send(embed)
        }
    })
}
const actionlog = function (client, guild, embed) {
    client.db.findOne({ guildID: guild.id }, async (err, settings) => {
        if (err) console.log(err)
        if (settings) {
            if (settings.actionlog == "") return;
            let actionlog = guild.channels.get(settings.actionlog);
            if (!actionlog) return;
            actionlog.send(embed)
        }
    })
}
const days = function (date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};
//Round Number.
const roundNumber = function (num, scale = 0) {
    if (!String(num).includes('e')) {
        return Number(`${Math.round(`${num}e+${scale}`)}e-${scale}`);
    }
    const arr = `${num}`.split('e');
    let sig = '';

    if (Number(arr[1]) + scale > 0) {
        sig = '+';
    }

    return Number(`${Math.round(`${Number(arr[0])}e${sig}${Number(arr[1]) + scale}`)}e-${scale}`);
};
//Array Clean.
const arrayClean = function (deleteValue, array) {
    for (let val in array) {
        if (array[val] === deleteValue) {
            array.splice(val, 1);
            val -= 1;
        }
    }

    return array;
};

const clean = async (client, text) => {
    if (text && text.constructor.name == 'Promise')
        text = await text;
    if (typeof evaled !== 'string') text = require('util').inspect(text);

    text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(client.token, '--Nope--');

    return text;
};
//Start Typing.
const stopTyping = function (msg) {
    msg.channel.stopTyping(true);
};
//Stop Typing.
const startTyping = function (msg) {
    msg.channel.startTyping(1);
};


module.exports = {
    days,
    owner,
    coins,
    logger,
    logchannel,
    stopTyping,
    startTyping,
    clean,
    arrayClean,
    roundNumber,
    actionlog,
    vclogs,
    perms,
    stats,
    embed,
    error,
    user,
    server,
    mod,
    messages,
    joins
}
