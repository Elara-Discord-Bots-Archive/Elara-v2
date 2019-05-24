const {RichEmbed} = require('discord.js');
module.exports.run = async (client) => {
    let e = new RichEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL)
    .setDescription(`Reconnecting`)
    .setTimestamp()
    .setColor(client.util.colors.yellow)
    client.channels.get(client.config.log).send(e)
    let embed = new RichEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL)
    .setColor(client.util.colors.yellow)
    .setTitle(`Reconnecting`)
    .setTimestamp()
    client.channels.get("532628525640056852").send(embed)
}
