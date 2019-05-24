const Discord = require('discord.js');
module.exports.run = async (bot, oldMember, newMember) => {
    try{
    if (oldMember.nickname !== newMember.nickname) {
            let embed = new Discord.RichEmbed()
                .setColor(newMember.displayColor)
                .setAuthor(`Nickname Changed`, newMember.user.displayAvatarURL)
                .setTimestamp()
                .setDescription(`**Old: **${oldMember.nickname ? oldMember.nickname : oldMember.user.username}\n**New: **${newMember.nickname ? newMember.nickname : newMember.user.username}`)
                if(newMember.guild.me.hasPermission('VIEW_AUDIT_LOG')){
                await newMember.guild.fetchAuditLogs({type: "MEMBER_UPDATE"}).then(async log => {
                    let mod = log.entries.first().executor;
                    if(mod.id !== newMember.user.id){
                    embed.addField(`\u200b`, `**User: **${newMember}\`\`${newMember.user.tag}\`\` (${newMember.id})\n**Updated By: **${mod} \`\`${mod.tag}\`\` (${mod.id})`)
                    }else{
                    embed.addField(`\u200b`, `**User: **${newMember}\`\`${newMember.user.tag}\`\` (${newMember.id}))`)
                    }
                    })
                }
           return bot.functions.server(bot, newMember.guild, embed)
    } else
        if (oldMember.roles !== newMember.roles) {
            let oldRoles = oldMember.roles.map(role => role.name)
            let newRoles = newMember.roles.map(role => role.name)
            if (oldRoles == newRoles) return;
            let data = [];
            let colors = [];
            oldRoles.forEach(role => {if(newRoles.includes(role)){return;}else{let r = newMember.guild.roles.find(c => c.name === role);colors.push(r.hexColor);data.push(`${bot.util.emojis.eminus} ${r} (${r.id})`)}}) 
            newRoles.forEach(role => {if(oldRoles.includes(role)) {return;}else{let r = newMember.guild.roles.find(c => c.name === role);colors.push(r.hexColor);data.push(`${bot.util.emojis.eplus} ${r} (${r.id})`)}});
            let message = '';
            let color = '';
            if(data.length > 1){
                message = "Multiple Member Roles Manipulated"
            }else{
                message = "Member Roles Manipulated";
                color = colors[0];
            
            }
            let e = new Discord.RichEmbed()
            .setTimestamp()
            .setAuthor(newMember.user.tag, newMember.user.displayAvatarURL)
            .setColor(color?color:"PURPLE")
            .setFooter(bot.user.tag, bot.user.displayAvatarURL)
            .setTitle(message)
            .addField(`Member`, `${newMember.user} \`@${newMember.user.tag}\` (${newMember.user.id})`)
            .setDescription(data.join('\n'))
            if(newMember.guild.me.hasPermission("VIEW_AUDIT_LOG")){
                await newMember.guild.fetchAuditLogs({type: "MEMBER_ROLE_UPDATE"}).then(async logs => {
                    let moderator = logs.entries.first().executor;
                    if(moderator.id !== newMember.user.id){
                        e.addField(`Moderator`, `${moderator} \`@${moderator.tag}\` (${moderator.id})`)
                    }
            });
            }
            return bot.functions.server(bot, newMember.guild, e)
    }
}catch(e){
    bot.logger(bot, newMember.guild, e.stack)
}
}
