const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const { facts } = require('../../../util/facts.json');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "fact",
            memberName: "fact",
            aliases: [`randomfact`, `random-fact`],
            examples: [`${client.commandPrefix}fact`],
            description: "Gives a random fact.",
            throttling: {
            usages: 1,
            duration: 5
            },
            group: "fun",

        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let result = Math.floor((Math.random() * facts.length));
        let embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription("<a:Dots:426956230582599690> Loading a Fact, Please Wait...")
        message.channel.send(embed).then(message => {
            embed.setColor("RANDOM")
            embed.setTitle(`FACT!`)
            embed.setDescription(facts[result])
            message.edit(embed)
        })
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
