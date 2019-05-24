const Discord = require('discord.js');
const moment = require('moment')
let request = require('superagent');
const Settings = require('../util/models/settings.js');
module.exports.run = async (client, messages) => {
    let db = await Settings.findOne({ guildID: messages.first().channel.guild.id }, async (err, db) => { db })
    if (messages.first().channel.id === db.logchannel) return;
    try{
        
    let messageArray = messages.map(m => m.author ? `Author: ${m.author.tag}\nAuthor ID: (${m.author.id})\nMessage ID: ${m.id}\nTimestamp: ${moment(m.createdAt).format('MMMM Do YYYY')}\n${m.content ? `Content:\n${m.content}` : ''}${m.embeds.map(c => c).length !== 0 ? 'Contains Embed ' : ''}${m.attachments.map(c => c).length !== 0 ? `Attachment: ${m.attachments.map(c => c.proxyURL)}` : ''}` : `Message ID: ${m.id}\nChannel Name: ${m.channel.name}\nChannel ID: ${m.channel.id}\nNon-Cached Message`)
    let messagesString = messageArray.join('\r\n\n')
    request
        .post(`https://paste.lemonmc.com/api/json/create`)
        .send({
            data: `Message Bulk Delete From: ${messages.first().channel.name}\n\n${messagesString}`,
            language: 'text',
            private: true,
            title: `${messages.first().channel.name}`,
            expire: '2592000'
        })
        .end(async (err, res) => {
            if (!err && res.statusCode === 200 && res.body.result.id) { // weird error reporting system.
                let link = `https://paste.lemonmc.com/${res.body.result.id}/${res.body.result.hash}`

                let channel = messages.first().channel;
                let guild = channel.guild
                let embed = new Discord.RichEmbed()
                    .setColor(0xf44336)
                    .setAuthor(`Message Bulk Deleted`, guild.iconURL)
                    .addField('Info', `**Channel: **${messages.first().channel} \`#${messages.first().channel.name}\` (${messages.first().channel.id})`)
                    .setTitle(`Messages [${messages.map(c => c.content).length}]`)
                    .setDescription(`Link: [Click Here](${link})`)
                    .setFooter(client.user.tag, client.user.displayAvatarURL)
                    .setTimestamp()
                client.functions.messages(client, messages.first().channel.guild, embed)
            } else {
                return;
            }
        })
    }catch(e){
        client.logger(client, messages.first().channel.guild, e.stack) 
    }
}