const Discord = require('discord.js');
module.exports.run = async (bot, guild, user) => {
    try{
    setTimeout(async () => {
    if (guild.me.hasPermission('VIEW_AUDIT_LOG')) {
        await guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD" }).then(async audit => {
            if (audit.entries.first().target.id === user.id) {
                let reason = audit.entries.first().reason;
                let mod = audit.entries.first().executor;
                let e = new Discord.RichEmbed()
                    .setAuthor(`Member Banned`, guild.iconURL)
                    .setColor(`#FF0000`)
                    .setTitle(`Info`)
                    .setFooter(bot.user.tag, bot.user.displayAvatarURL)
                    .setTimestamp()
                    .setThumbnail(user.displayAvatarURL)
                    .setDescription(`**User: **\n${user}\n\`${user.tag}\`\n(${user.id})\n\n**Banned By: **\n${mod}\n\`${mod.tag}\`\n(${mod.id})\n\n**Reason: **\n${reason ? reason : "No Reason Provided"}`)
                    bot.functions.mod(bot, guild, e)
            }
        })
    } else {
        let e = new Discord.RichEmbed()
            .setAuthor(`Member Banned`, guild.iconURL)
            .setColor(`#FF0000`)
            .setTitle(`Info`)
            .setFooter(bot.user.tag, bot.user.displayAvatarURL)
            .setTimestamp()
            .setThumbnail(user.displayAvatarURL)
            .setDescription(`**User: **${user}\`${user.tag}\`(${user.id})\nI can't view audit logs!`)
            bot.functions.mod(bot, guild, e)
    }
    }, 5000)
}catch(e){
    bot.logger(bot, guild, e.stack)
}
}