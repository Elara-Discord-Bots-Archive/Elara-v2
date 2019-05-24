const Discord = require('discord.js');
module.exports.run = async (bot, oldChannel, newChannel) => {
    try{
    let embed = new Discord.RichEmbed()
        .setColor(`#FF000`)
        .setAuthor(newChannel.guild.name, newChannel.guild.iconURL)
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL)
    if (oldChannel.name !== newChannel.name) {
        if (oldChannel.guild.members.get(bot.user.id).permissions.has("VIEW_AUDIT_LOG")) {
            let who = await oldChannel.guild.fetchAuditLogs().then(audit => audit.entries.first().executor)
            embed.setTitle(`Channel Name Changed`)
            embed.setDescription(`**Old Name: ** ${oldChannel.name}\n**New Name: ** ${newChannel.name}\n**ID: **${newChannel.id}\n**Updated By: ** ${who}`)
            bot.functions.server(bot, oldChannel.guild, embed)
        } else {
            embed.setTitle(`Channel Name Changed`)
            embed.setDescription(`**Old Name: ** ${oldChannel.name}\n**New Name: ** ${newChannel.name}\n**ID: **${newChannel.id}`)
            bot.functions.server(bot, oldChannel.guild, embed)
        }
    }
}catch(e){
    bot.logger(bot, oldChannel.guild, e.stack)
}
}