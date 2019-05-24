const Discord = require('discord.js');
const Settings = require('../util/models/settings.js');
module.exports.run = async (client, message) => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    let db = await Settings.findOne({ guildID: message.guild.id }, async (err, db) => { db })
    if(message.channel.id === db.logchannel) return;

    try{
    let image = message.attachments.map(g => g.proxyURL)
    //Checks
    let e = new Discord.RichEmbed()
    .setAuthor(`Message Deleted`, message.author.displayAvatarURL)
    .setTitle(`Content`)
    .setColor(`#FF0000`)
    .addField(`Info`, `**User: **${message.author} \`@${message.author.tag}\` (${message.author.id})\n**Channel: **${message.channel} \`#${message.channel.name}\` (${message.channel.id})`)
    //Defined Type
    let type = {
        "GUILD_MEMBER_JOIN": `${message.author} just joined the server.`,
        "PINS_ADD": `${message.author} pinned a message to this channel. **See all the pins.**`,
        "DEFAULT": `${message.cleanContent}`
    }
    //Image logging stuff...
    if (message.attachments.map(c => c.proxyURL).length === 1) {
            if (image.join(" ").toLowerCase().includes(".gif")) {
                e.attachFiles([new Discord.Attachment(image.join(" "), "boop.gif")])
                e.setImage("attachment://boop.gif")
            }
            if (image.join(" ").toLowerCase().includes(".png") || image.join(" ").toLowerCase().includes(".jpg") || image.join(" ").toLowerCase().includes('.jpeg')) {
                e.attachFiles([new Discord.Attachment(image.join(" "), "boop.png")])
                e.setImage("attachment://boop.png")
            }
            e.setDescription(`${type[message.type] ? type[message.type] : "None"}`)
        } else {
            e.setDescription(type[message.type] ? type[message.type] : image)
        }

        //Sends to the modlogs channel.
        client.functions.messages(client, message.guild, e)
    }catch(e){ 
        client.logger(client, message.guild, e.stack, message)
    }
}