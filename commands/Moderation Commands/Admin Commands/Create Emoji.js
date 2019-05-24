const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class EmojiCreateCommand extends Command {
    constructor(client) {
        super(client, {
            name: "createemoji",
            memberName: "createemoji",
            description: "Creates a Emoji for the server",
            group: "admin",
            examples: [`${client.commandPrefix}createemoji <Link Here> <Name Here>`],
            guildOnly: true,
            aliases: ['ce'],
            args: [
                {
                    key: 'ImageURL',
                    prompt: `Please provide a URL to a image to make into a emoji.`,
                    type: 'string',
                    default: message => message.attachments.first().url
                },
                {
                    key: "name",
                    prompt: "Please provide a name for the emoji.",
                    type: "string"
                }
            ]
        })
    }
    async run(message, { ImageURL, name }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_EMOJIS")) return;
        try{
        message.guild.createEmoji(ImageURL, name)
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