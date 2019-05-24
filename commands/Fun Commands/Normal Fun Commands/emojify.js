const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "emojify",
            memberName: "emojify",
            aliases: [],
            examples: [`${client.commandPrefix}emojify <text here>`],
            description: "Emojifys the text you post",
            group: "fun",
            throttling: {
            usages: 1,
            duration: 5
            },
            args: [
                {
                    key: 'content',
                    prompt: 'Please Provide the text you want me to emojify!',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, {content}) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        const mapping = {
            ' ': '   ',
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
            '!': ':grey_exclamation:',
            '?': ':grey_question:',
            '#': ':hash:',
            '*': ':asterisk:'
        };

        'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
            mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
        });

        if (content.split('').map(c => mapping[c] || c).join('').length < 2000){
        message.channel.send(content.split('').map(c => mapping[c] || c).join(''));
    }else {
        message.channel.send(`The args provided is to big to be emojified`)
    }
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
