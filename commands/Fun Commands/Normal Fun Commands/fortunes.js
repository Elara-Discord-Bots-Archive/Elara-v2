const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "fortune",
            memberName: "fortune",
            aliases: [],
            examples: [`${client.commandPrefix}fortune`],
            description: "Gives you a fortune",
            throttling: {
            usages: 1,
            duration: 5
            },
            group: "fun"
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let result = Math.floor((Math.random() * this.client.util.fortunes.length));
        let usernameid = message.author.tag;
        let usernameurl = message.author.avatarURL;
        let embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription("<a:Dots:426956230582599690> Loading the Fortune")

        message.channel.send(embed).then(message => {
            embed.setColor("RANDOM")
            embed.setAuthor(`${usernameid}`, `${usernameurl}`)
            embed.setTitle(`You're Fortune`)
            embed.setDescription(`**${this.client.util.fortunes[result]}**`)
            message.edit(embed)
        })
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
