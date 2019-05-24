const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class SACommand extends Command {
    constructor(client) {
        super(client, {
            name: "setavatar",
            memberName: "setavatar",
            group: "owner",
            description: "Sets the avatar of the Bots Account",
            aliases: ["sa", "setav"],
            ownerOnly: true,
            args: [
                {
                    key: "url",
                    prompt: "What do you want to be the new avatar profile photo?",
                    type: "string",
                    default: message => message.attachments.first().url
                }
            ]
        })
    }
    async run(message, { url }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        this.client.user.setAvatar(url);
        message.channel.send(`Done. ${this.client.util.emojis.semoji}`)
       } catch (e) {
       this.client.logger(this.client, message.guild, e.stack, message, message.channel)
       }
    }
}