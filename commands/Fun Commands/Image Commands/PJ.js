const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js'),
    { PJ } = require('../../../util/photos.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pj",
            memberName: "pj",
            aliases: ["pjcat"],
            examples: [`${client.commandPrefix}PJ`],
            description: "Posts a PJ cat photo",
            group: "image"
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let result = Math.floor((Math.random() * PJ.length));
        let embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription("<a:Dots:426956230582599690> Loading a PJ Photo, Please Wait...")

        message.channel.send(embed).then(message => {
            embed.setColor("RANDOM")
            embed.setDescription("Here's a Photo of a PJ 😊")
            embed.setImage(PJ[result])
            embed.setFooter(`PJ Photo ${result}/${PJ.length}`)
            message.edit(embed)
        })
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}