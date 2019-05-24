const Discord = require('discord.js');
const moment = require('moment')
require('moment-duration-format');
const reps = require('../util/models/reps.js');
const coins = require('../util/models/money.js');
module.exports.run = async (bot, member) => {
    try{
    if(bot.users.get(member.id) === null){
        reps.findOneAndDelete({userID: member.user.id}, (err) => console.log(err))
    }
    coins.findOneAndRemove({userID: member.user.id}, (err) => console.log(err));
    let botembed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setAuthor(`Member Left${bot.isOwner(member.user.id) ? ' - 🛡 Bot Owner' : ''}`, member.user.displayAvatarURL)
        .setTimestamp()
        .addField(`UserInfo`, `**Mention: **${member.user}\n**Tag: **${member.user.tag}\n**ID: **${member.id}\n**Nickname: **${member.nickname ? member.nickname : "None"}\n**Joined At: **${moment(member.joinedAt).format('dddd, MMMM Do YYYY')}\n**Created At: **${moment(member.user.createdAt).format('dddd, MMMM Do YYYY')}`)
        .addField(`Had Role(s)`, member.roles.size > 1 ? bot.functions.arrayClean(null, member.roles.map((r) => { if (r.name !== '@everyone') { return r; } return null; })).join(' | ') : '**None**', false)
        .setFooter(`Member Left At`)
        .setThumbnail(member.user.displayAvatarURL)
//       if(member.guild.id === "273525914187333637"){
//     member.guild.channels.get("450465589064892423").send(botembed)
//     }else{
    bot.functions.joins(bot, member.guild, botembed)
//     }
    }catch(e){
        bot.logger(bot, member.guild, e.stack)
    }
}
