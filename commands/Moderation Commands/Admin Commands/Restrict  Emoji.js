const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class EmojiCreateCommand extends Command {
    constructor(client) {
        super(client, {
            name: "restrictemoji",
            memberName: "restrictemoji",
            description: "Creates and restricts the Emoji to a certain role for the server",
            group: "admin",
            examples: [`${client.commandPrefix}restrictemoji <Link/attachment Here> <Name Here> <Role here>`],
            guildOnly: true,
            aliases: ['re'],
            args: [
                {
                    key: 'emoji',
                    prompt: `Please provide a URL to a image to make into a emoji.`,
                    type: 'string',
                    default: message => message.attachments.first().url
                },
                {
                    key: "name",
                    prompt: "Please provide a name for the emoji.",
                    type: "string"
                },
                {
                    key: "role",
                    prompt: "Please provide a role to restrict the emoji to.",
                    type: "role"
                }
            ]
        })
    }
    async run(message, { emoji, name, role }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_EMOJIS")) return;
        try{
        message.guild.createEmoji(emoji, name, [role], [`Created By: ${message.author.tag}`])
            .then(emoji => {
                let embed = new Discord.RichEmbed()
                    .setColor(`RANDOM`)
                    .setDescription(`Created the Emoji!`)
                    .addField(`Emoji Name`, emoji.name, true)
                    .addField(`Emoji`, emoji, true)
                    .setImage(emoji.url)
                message.channel.send(embed)
            }).catch(error => {
                let embed = new Discord.RichEmbed()
                    .setColor(`#FF0000`)
                    .setTitle(`ERROR`)
                    .setDescription(error)
                message.say(embed)
            });
        } catch (e) {
        this.client.error(this.client, message, e)
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}