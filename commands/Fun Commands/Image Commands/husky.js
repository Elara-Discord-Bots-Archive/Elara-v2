const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js'),
    { Husky } = require('../../../util/photos.js')
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "husky",
            memberName: "husky",
            aliases: ["huskys"],
            examples: [`${client.commandPrefix}husky`],
            description: "Posts a husky photo",
            group: "image"
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let result = Math.floor((Math.random() * Husky.length));
        let embed = new Discord.RichEmbed()
            .setColor("#FF000")
            .setDescription("<a:Dots:426956230582599690> Loading the Command, Please Wait.,,,,")

        message.channel.send(embed).then(message => {
            embed.setColor("RANDOM")
            embed.setDescription("Here's a Photo of a Husky 😊")
            embed.setImage(Husky[result])
            embed.setFooter(`Husky Photo ${result}/${Husky.length}`)
            message.edit(embed)
        })
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}