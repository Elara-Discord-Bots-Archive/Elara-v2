const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "panda",
            memberName: "panda",
            aliases: [],
            examples: [`${client.commandPrefix}panda`],
            description: "Posts a Panda photo",
            group: "image"
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let { body } = await this.client.superagent.get(`https://api-to.get-a.life/pandaimg`)
        if (!body.link) return message.channel.send(`No Image came up, Try again.`)
        let e = new Discord.RichEmbed()
            .setImage(body.link)
            .setColor(`RANDOM`)
            .setTimestamp()
            .setDescription(`Panda <a:Panda:515655244223479809>`)
        message.say(e)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}