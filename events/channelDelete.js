const Discord = require('discord.js');
const chalk = require('chalk');
module.exports.run = async (bot, channel) => {
    try{
    bot.db.findOne({guildID: channel.guild.id}, (err, settings) => {
        if(settings.logchannel === channel.id){
            settings.logchannel = ""
            console.log(chalk.default.red(`[Log Channel Deleted]`) + ` Guild: ${channel.guild.name} (${channel.guild.id})`)
        }
        if(settings.vclogs === channel.id){
            settings.vclogs = ''
            console.log(chalk.default.red(`[Voice Chat Logs Channel Deleted]`) + ` Guild: ${channel.guild.name} (${channel.guild.id})`)
        }
        if(settings.actionlog === channel.id){
        settings.actionlog = ''
            console.log(chalk.default.red(`[Action Logs Channel Deleted]`) + ` Guild: ${channel.guild.name} (${channel.guild.id})`)
        }
        if(settings.reportschannel === channel.id){
            settings.reportschannel = ''
            console.log(chalk.default.red(`[Reports Log Channel Deleted]`) + ` Guild: ${channel.guild.name} (${channel.guild.id})`)
        }
        settings.save().catch(err => console.log(err))
    })
    let e = new Discord.RichEmbed()
    if (channel.guild.members.get(bot.user.id).permissions.has("VIEW_AUDIT_LOG")) {
        let who = await channel.guild.fetchAuditLogs().then(audit => audit.entries.first().executor)
        e.setDescription(`
        **Name: **${channel} (${channel.name})
        **Type: **${channel.type}
        **ID: **${channel.id}
        **Deleted By: **${who}`)
        e.setColor("#FF0000")
        e.setAuthor('Channel Deleted', channel.guild.iconURL)
        e.setFooter(`ID: ${channel.id}`)
        e.setTimestamp()
        bot.functions.server(bot, channel.guild, e)
    } else {
        e.setDescription(`
        **Name: **${channel} (${channel.name})
        **Type: **${channel.type}
        **ID: **${channel.id}`)
        e.setColor("#FF0000")
        e.setAuthor('Channel Deleted', channel.guild.iconURL)
        e.setFooter(`ID: ${channel.id}`)
        e.setTimestamp()
        bot.functions.server(bot, channel.guild, e)
    }
}catch(e){
    bot.logger(bot, channel.guild, e.stack)
}
}