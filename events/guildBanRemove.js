const Discord = require('discord.js');
module.exports.run = async (bot, guild, user) => {
    try{
    let e = new Discord.RichEmbed()
        .setAuthor(`Member Unbanned`, guild.iconURL)
        .setColor(`#FF000`)
        .setTitle(`Info`)
        .setFooter(bot.user.tag, bot.user.displayAvatarURL)
        .setTimestamp()
        .setThumbnail(user.displayAvatarURL)
    if (guild.members.get(bot.user.id).permissions.has("VIEW_AUDIT_LOG")) {
        let logs = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(a => a.entries.first())
        if(logs.target.id === user.id){
        let who = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first().executor)
        e.setDescription(`**User: **${user} \`${user.tag}\` (${user.id})\n**Moderator: **${who} \`${who.tag}\` (${who.id})`)
        e.addField(`Reason`, logs.reason ? logs.reason : "No Reason Provided")
        }
    } else {
        e.setDescription(`**User: **${user} \`${user.tag}\` (${user.id})`)
    }
    bot.functions.mod(bot, guild, e)
    }catch(e){
        bot.logger(bot, guild, e.stack)
    }
}