const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js'),
    figlet = require('figlet');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ascii",
            memberName: "ascii",
            aliases: ["ac"],
            examples: [`${client.commandPrefix}ascii <Text Here>`],
            description: "Turns the text you provide into ascii text.",
            group: "fun",
            throttling: {
            usages: 1,
            duration: 5
            },
            args: [
                {
                    key: 'content',
                    prompt: 'Please provide the text to make into ascii text!',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        figlet(content, (err, data) => {
            message.channel.send(data,{code: 'ascii'})
            })
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
