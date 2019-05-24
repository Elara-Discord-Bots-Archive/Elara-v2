const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "googleit",
            memberName: "googleit",
            aliases: [],
            examples: [`${client.commandPrefix}googleit`],
            description: "Posts a google it gif",
            throttling: {
            usages: 1,
            duration: 5
            },
            group: "special"
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`GOOGLE IT!!!!`)
            .setImage(`https://vgy.me/vnEMkf.gif`)
        message.embed(embed)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
        
    }
}
