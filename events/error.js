let {RichEmbed} = require('discord.js');
module.exports.run = async(client, error) => {
    let errs = await error;
    let e = new RichEmbed()
    .setColor(client.util.colors.red)
    .setAuthor(client.user.tag, client.user.displayAvatarURL)
    .setDescription(errs.stack)
    .setTimestamp()
    .setTitle(`ERROR`)
    client.channels.get(client.config.log).send(e)
}