const Discord = require('discord.js');
const moment = require('moment')
require('moment-duration-format')
module.exports.run = (bot, role) => {
    try {
        let botembed = new Discord.RichEmbed()
            .setColor("#FF000")
            .setAuthor('Role Deleted', role.guild.iconURL)
            .setFooter(`${bot.user.tag}`, `${bot.user.displayAvatarURL}`)
            .setTimestamp()
            .addField(`INFO`, `
            **Role: **${role.name} (${role.id})
            **Position: **${role.position}
            **Hoisted: **${role.hoist ? "Yes" : "No"}
            **Mentionable: **${role.mentionable ? "Yes" : "No"}
            **Color: **${role.hexColor}
            **Role Created At: **${moment(role.createdAt).format('dddd, MMMM Do YYYY')}`)
        bot.functions.server(bot, role.guild, botembed)
    } catch (e) {
        bot.logger(bot, role.guild, e.stack)
    }
}