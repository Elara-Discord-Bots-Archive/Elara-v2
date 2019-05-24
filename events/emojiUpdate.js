const Discord = require('discord.js');
const moment = require('moment-timezone');
module.exports.run = async (bot, oldEmoji, newEmoji) => {
    try{
    let ca = `${moment(oldEmoji.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a zz')}`
    let e = new Discord.RichEmbed()
        .setAuthor(`Emoji Updated`, newEmoji.guild.iconURL)
        .setTitle(`Info`)
        .setColor(`#F2FF00`)
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL)
        .setThumbnail(newEmoji.url)
    if(oldEmoji.name !== newEmoji.name){
    if (newEmoji.guild.members.get(bot.user.id).permissions.has("VIEW_AUDIT_LOG")) {
        let who = await newEmoji.guild.fetchAuditLogs().then(audit => audit.entries.first().executor)
        e.setDescription(`**Emoji: **${newEmoji}\n**Old Name: **${oldEmoji.name}\n**New Name: **${newEmoji.name}\n**ID: **${newEmoji.id}\n**Animated: **${newEmoji.animated ? "Yes" : "No"}\n**Link: **[Click Here](${newEmoji.url})\n**Created At: **${ca}\n**Updated By: **${who}`)
    } else {
        e.setDescription(`**Emoji: **${newEmoji}\n**Old Name: **${oldEmoji.name}\n**New Name: **${newEmoji.name}\n**ID: **${newEmoji.id}\n**Animated: **${newEmoji.animated ? "Yes" : "No"}\n**Link: **[Click Here](${newEmoji.url})\n**Created At: **${ca}`)
    }
    bot.functions.server(bot, oldEmoji.guild, e)
}else
if(oldEmoji._roles.length !== newEmoji._roles.length){
    e.setDescription(`
    **Emoji: **${newEmoji}
    **Old Roles: **${oldEmoji._roles}
    **New Roles: **${newEmoji._roles}
    **ID: **${newEmoji.id}
    **Animated: **${newEmoji.animated ? "Yes" : "No"}
    **Link: **[Click Here](${newEmoji.url})
    **Created At: **${ca}`)
    bot.functions.server(bot, oldEmoji.guild, e)
}
}catch(e){
    bot.logger(bot, oldEmoji.guild, e.stack)
}
}