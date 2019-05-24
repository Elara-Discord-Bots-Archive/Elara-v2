const Discord = require('discord.js');
module.exports.run = async (bot, oldRole, newRole) => {
    if(newRole.id === newRole.guild.id) return;
    if(oldRole === newRole) return;
    if(oldRole.hexColor === newRole.hexColor && oldRole.hoist === newRole.hoist && oldRole.mentionable === newRole.mentionable && oldRole.name === newRole.name) return;
    try{
    let e = new Discord.RichEmbed()
        .setColor(newRole.color)
        .setFooter(bot.user.tag, bot.user.displayAvatarURL)
        .setTitle(`Role Updated`)
        .addField(`Information`, `**Name:** ${newRole}\n**ID:** ${newRole.id}`)
    if (oldRole.name !== newRole.name) {
        e.addField(`Name`, `**Before:** ${oldRole.name}\n **After:** ${newRole.name}`)
    }
    if (oldRole.color !== newRole.color) {
        e.addField(`Role Color`, `**Before:** ${oldRole.hexColor}\n **After:** ${newRole.hexColor}`)
    }
    if (oldRole.hoist !== newRole.hoist) {
        e.addField(`Hoist`, `**Before:** ${oldRole.hoist ? "Hoisted" : "Not Hoisted"}\n **After:** ${newRole.hoist ? "Hoisted" : "Not Hoisted"}`)
    }
    if (oldRole.mentionable !== newRole.mentionable) {
        e.addField(`Mentionable`, `**Before: **${oldRole.mentionable ? "Yes" : "No"}\n**After: **${newRole.mentionable ? "Yes" : "No"}`)
    }
    bot.functions.server(bot, oldRole.guild, e)
}catch(e){
    bot.logger(bot, oldRole.guild, e.stack)
}
}