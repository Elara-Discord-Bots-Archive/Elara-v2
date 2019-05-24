const { Command } = require('../../../util/Commando');
const Discord = require('discord.js');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            group: 'mod',
            memberName: 'say',
            description: 'Sends a message to the channel',
            aliases: ['speak', 'talk'],
            examples: [`${client.commandPrefix}say Hi there!`],
            guildOnly: true,
            args: [
                {
                    key: 'content',
                    prompt: 'What would you like the content of the message to be?',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, msg, "MANAGE_MESSAGES")) return;
        try{
        msg.channel.send(content)
        msg.delete().catch()
        } catch (e) {
            this.client.error(this.client, msg, e);
        this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
        }
    }
};