const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js'),
    { Amber } = require('../../../util/photos.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "amber",
            memberName: "amber",
            aliases: ["ambercat"],
            examples: [`${client.commandPrefix}amber`],
            description: "Posts a random Amber Cat Photo :D",
            group: `image`,
            hidden: true
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let replies = Amber
        let result = Math.floor((Math.random() * replies.length));
        let embed = new Discord.RichEmbed()
            .setColor("#FF000")
            .setDescription("<a:Dots:426956230582599690> Loading the Command, Please Wait...")

        message.channel.send(embed).then(message => {
            embed.setColor("#000FF")
            embed.setDescription("Here's a Photo of Amber 😊")
            embed.setImage(replies[result])
            embed.setFooter(`Amber Cat Photo ${result}/${replies.length}`)
            message.edit(embed)
        })
        } catch (e) {
            this.client.error(this.client, message, e)
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}