const Discord = require('discord.js');
const moment = require('moment-timezone');
module.exports.run = async (bot, emoji) => {
    try{
    let ca = `${moment(emoji.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a zz')}`
    let e = new Discord.RichEmbed()
        .setAuthor(`Emoji Deleted`, emoji.guild.iconURL)
        .setTitle(`Info`)
        .setColor(`#FF0000`)
        .setTimestamp()
        .setThumbnail(emoji.url)
        .setFooter(bot.user.tag, bot.user.displayAvatarURL)
    if (emoji.guild.members.get(bot.user.id).permissions.has("VIEW_AUDIT_LOG")) {
        let who = await emoji.guild.fetchAuditLogs().then(audit => audit.entries.first().executor)
        e.setDescription(`**Name: **${emoji.name}\n**ID: **${emoji.id}\n**Animated: **${emoji.animated ? "Yes" : "No"}\n**Link: **[Click Here](${emoji.url})\n**Created At: **${ca}\n**Deleted By: **${who}`)
    } else {
        e.setDescription(`**Name: **${emoji.name}\n**ID: **${emoji.id}\n**Animated: **${emoji.animated ? "Yes" : "No"}\n**Link: **[Click Here](${emoji.url})\n**Created At: **${ca}`)
    }
    bot.functions.server(bot, emoji.guild, e)
}catch(e){
    bot.logger(bot, emoji.guild, e.stack)
}
}