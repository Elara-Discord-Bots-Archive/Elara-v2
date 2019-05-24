const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reverse",
            memberName: "reverse",
            aliases: [],
            examples: [`${client.commandPrefix}reverse <text here>`],
            description: "Reverses the text you give the bot.",
            group: "fun",
            throttling: {
            usages: 1,
            duration: 5
            },
            args: [
                {
                    key: 'content',
                    prompt: 'What do you want me to reverse?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        function reverseString(str) {
            return str.split("").reverse().join("");
        }
        let sreverse = reverseString(content)
        const reverseEmbed = new Discord.RichEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL)
            .setColor(0xFFF000)
            .addField('Input: ', '```' + `${content}` + '```')
            .addField('Output: ', '```' + `${sreverse}` + '```')
        message.channel.send({ embed: reverseEmbed })
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
