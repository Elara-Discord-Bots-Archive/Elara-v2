const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "bug",
            memberName: "bug",
            aliases: [],
            examples: [`${client.commandPrefix}bug <Issue>`],
            description: "Posts the args provided in the #known-issues channel",
            ownerOnly: true,
            group: "owner/misc",
            args: [
                {
                    key: 'content',
                    prompt: 'What is the issue..',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let e = new Discord.RichEmbed()
            .setColor(`#FF7900`)
            .setTitle(`Known Issue`)
            .setDescription(content)
        this.client.channels.get("515789775731425280").send(e)
        await message.channel.send(`Message Sent.`)
        } catch (e) {
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
        
    }
}