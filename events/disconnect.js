const {RichEmbed} = require('discord.js');
module.exports.run = async (client) => {
    let e = new RichEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL)
    .setColor(client.util.colors.red)
    .setDescription(`Disconnected`)
    .setTimestamp()
    client.channels.get(client.config.log).send(e)
    console.log(`${client.user.tag} (${client.user.id}) has been disconnected.`)
      let embed = new RichEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL)
    .setColor(client.util.colors.red)
    .setTitle(`Disconnected`)
    .setTimestamp()
    client.channels.get("532628525640056852").send(embed)
}
