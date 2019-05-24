const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class SNCommand extends Command {
    constructor(client) {
        super(client, {
            name: "setname",
            memberName: "setname",
            group: "owner",
            ownerOnly: true,
            examples: [`${client.commnadPrefix}setname <Name Here>`],
            aliases: ['sn', 'setn'],
            description: "Sets the Name for the Bot Account",
            args: [
                {
                    key: "botname",
                    prompt: "What do you want the bot name to be?",
                    type: "string"
                }
            ]
        })
    }
    async run(msg, { botname }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try {
            this.client.user.setName(botname)
            msg.channel.send(`Done. ${this.client.util.emojis.semoji}`)
       } catch (e) {
       this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
       }

    }
}