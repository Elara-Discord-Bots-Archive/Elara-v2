const Discord = require('discord.js');
module.exports.run = (bot, role) => {
    try{
    let botembed = new Discord.RichEmbed()
        .setColor("#FF000")
        .setAuthor('Role Created', role.guild.iconURL)
        .setFooter(`${bot.user.tag}`, `${bot.user.displayAvatarURL}`)
        .setTimestamp()
        .addField(`INFO`, `**Role: **${role} \`${role.name}\` (${role.id})\n**Hex Color: **${role.hexColor}\n**Hoisted: **${role.hoist ? "Yes": "No"}`)
    bot.functions.server(bot, role.guild, botembed)
    }catch(e){
        bot.logger(bot, role.guild, e.stack)
    }
}