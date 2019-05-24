const Discord = require('discord.js');
const moment = require('moment-timezone');
module.exports.run = async (client, emoji) => {
    try{
    let ca = `${moment(emoji.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a zz')}`
    let e = new Discord.RichEmbed()
        .setAuthor(`Emoji Created`, emoji.guild.iconURL)
        .setTitle(`Info`)
        .setColor(`#FF000`)
        .setTimestamp()
        .setThumbnail(emoji.url)
        .setFooter(client.user.tag, client.user.displayAvatarURL)
    if (emoji.guild.members.get(client.user.id).permissions.has("VIEW_AUDIT_LOG")) {
        let who = await emoji.guild.fetchAuditLogs().then(audit => audit.entries.first().executor)
        e.setDescription(`**Emoji: **${emoji}\n**Name: **${emoji.name}\n**ID: **${emoji.id}\n**Animated: **${emoji.animated ? "Yes" : "No"}\n**Link: **[Click Here](${emoji.url})\n**Created At: **${ca}\n**Created By: **${who}`)
    } else {
        e.setDescription(`**Emoji: **${emoji}\n**Name: **${emoji.name}\n**ID: **${emoji.id}\n**Animated: **${emoji.animated ? "Yes" : "No"}\n**Link: **[Click Here](${emoji.url})\n**Created At: **${ca}`)
    }
    client.functions.server(client, emoji.guild, e)
}catch(e){
    client.logger(client, emoji.guild, e.stack)
}
}