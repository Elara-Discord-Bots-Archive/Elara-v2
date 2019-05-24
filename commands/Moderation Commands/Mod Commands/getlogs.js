const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const request = require('superagent');
const moment = require('moment');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "getlogs",
            memberName: "getlogs",
            aliases: [],
            examples: [`${client.commandPrefix}getlogs #general 20`, `${client.commandPrefix}getlogs #general 20 detail`],
            description: "Gives you the message logs for the channel.\nTypes: `detail`, `regular`",
            group: "mod",
            args: [
                {
                    key: "channel",
                    prompt: "What channel do you want me to fetch messages from?",
                    type: "channel"
                },
                {
                    key: 'content',
                    prompt: 'How many messages?',
                    type: 'integer',
                    min: 1,
                    max: 100
                },
                {
                    key: "type",
                    prompt: "What type, `detail` or `no`",
                    type: "string",
                    default: "no"
                }
            ]
        })
    }
    async run(msg, {channel ,content, type}) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, msg, "MANAGE_MESSAGES")) return;
        try{
        if(type === "no" || type === "node" || type === "regular"){
        let names = await channel.fetchMessages({ limit: content })
        let name = await names.map(m => m.author ? `Author: ${m.author.tag} (${m.author.id})\n${m.content ? `Content:\n${m.content} ` : ''}${m.embeds.map(c => c).length !== 0 ? 'Contains Embed ' : ''}${m.attachments.map(c => c).length !== 0 ? `Attachment: ${m.attachments.map(c => c.proxyURL)} ` : ''}` : `Message ID: ${m.id}\nChannel Name: ${m.channel.name}\nChannel ID: ${m.channel.id}\nNon-Cached Message`)
        let array = name.join('\r\n\n')
        let {body} = await request
            .post(`https://paste.lemonmc.com/api/json/create`)
            .send({
                data: `Message Logs from ${channel.name}:\n\n${array}`,
                language: 'text',
                private: true,
                title: `Testing`,
                expire: '2592000'
            })
        let link = `https://paste.lemonmc.com/${body.result.id}/${body.result.hash}`
        let e = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`[Click Here](${link})`)
        .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
        msg.channel.send(e)
    }else
    if(type === "detail" || type === "de"){
        let names = await channel.fetchMessages({ limit: content })
        let name = await names.map(m => m.author ? `Author: ${m.author.tag}\nAuthor ID: (${m.author.id})\nMessage ID: ${m.id}\nTimestamp: ${moment(m.createdAt).format('MMMM Do YYYY')}\n${m.content ? `Content:\n${m.content} ` : ''}${m.embeds.map(c => c).length !== 0 ? 'Contains Embed ' : ''}${m.attachments.map(c => c).length !== 0 ? `Attachment: ${m.attachments.map(c => c.proxyURL)} ` : ''}` : `Message ID: ${m.id}\nChannel Name: ${m.channel.name}\nChannel ID: ${m.channel.id}\nNon-Cached Message`)
        let array = name.join('\r\n\n')
        let { body } = await request
            .post(`https://paste.lemonmc.com/api/json/create`)
            .send({
                data: `Message Logs from ${channel.name}:\n\n${array}`,
                language: 'text',
                private: true,
                title: `Testing`,
                expire: '2592000'
            })
        let link = `https://paste.lemonmc.com/${body.result.id}/${body.result.hash}`
        let e = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`[Click Here](${link})`)
            .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
        msg.channel.send(e)
}
} catch (e) {
    this.client.error(this.client, msg, e);
this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
}
    }
}