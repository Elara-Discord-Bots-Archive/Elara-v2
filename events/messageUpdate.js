const Discord = require('discord.js');
const Settings = require('../util/models/settings.js');
module.exports.run = async (bot, oldMessage, newMessage) => {
    //Start of checks
    if (oldMessage.channel.type === "dm") return;
    if (oldMessage.content === newMessage.content) return;
    if (oldMessage.content.length === 0) return;
    if (newMessage.author.bot) return;
    //End of checks
    try{
    let db = await Settings.findOne({guildID: oldMessage.guild.id}, async(err, db) => {db})
    if(newMessage.channel.id === db.logchannel) return;
    let content = oldMessage.content;
    let content2 = newMessage.content;
    let length = content.length + content2.length;
    let channel = newMessage.channel;
    let user = newMessage.author;
    if (length > 2048) {
        let embed = new Discord.RichEmbed()
            .setColor(`#FF0000`)
            .setTitle(`Old Message`)
            .setDescription(`${content}`)
            .setAuthor(`Message Updated`, oldMessage.author.displayAvatarURL)
        bot.functions.messages(bot, oldMessage.guild, embed)
        let embed2 = new Discord.RichEmbed()
            .setColor(`#FF0000`)
            .setTitle(`New Message`)
            .setDescription(content2)
            .addField(`Info`, `**User: **${user} \`@${user.tag}\` (${user.id})\n**Channel: **${channel} \`#${channel.name}\` (${channel.id})`)
        await bot.functions.messages(bot, oldMessage.guild, embed2)
    } else
        if (length < 2040) {
            let embed = new Discord.RichEmbed()
                .setColor(`#FF0000`)
                .setTitle(`Content`)
                .setDescription(`**Old Message: **\n${content}\n\n**New Message: **\n${content2}`)
                .setAuthor(`Message Updated`, oldMessage.author.displayAvatarURL)
                .addField(`Info`, `**User: **${user} \`@${user.tag}\` (${user.id})\n**Channel: **${channel} \`#${channel.name}\` (${channel.id})`)
            bot.functions.messages(bot, oldMessage.guild, embed)
        }
    }catch(e){
        bot.logger(bot, oldMessage.guild, e.stack)
    }
}
