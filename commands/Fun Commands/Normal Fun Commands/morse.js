const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const morse = require('morse-node').create('ITU');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "morse",
            memberName: "morse",
            aliases: [],
            examples: [`${client.commandPrefix}morse <text here>`],
            description: "Turns the text you give into morse code",
            group: "fun",
            throttling: {
            usages: 1,
            duration: 5
            },
            args: [
                {
                    key: 'content',
                    prompt: 'Please Provide the text you want me to turn into morse code?!',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        const translated = morse.encode(content);
        const embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle('Morse Code Translator')
            .addField('📥 Original 📥', content, false)
            .addField('📤 Morse Code 📤', translated, false)
            .setTimestamp();
        message.channel.send(embed);
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
