const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const lmgtfy = require('lmgtfy');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "imgtfy",
            memberName: "imgtfy",
            aliases: ["google"],
            examples: [`${client.commandPrefix}imgtfy google it`],
            description: "Makes a IMGTFY gif of the text you give",
            group: "fun",
            args: [
                {
                    key: 'content',
                    prompt: 'What do you want the imgtfy gif to say?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let e = new Discord.RichEmbed()
            .setDescription(lmgtfy(content))
            .setColor(`RANDOM`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
        message.say(e)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}