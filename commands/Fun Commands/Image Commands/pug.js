const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js'),
    { Pug } = require('../../../util/photos.js')
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pug",
            memberName: "pug",
            aliases: ["puggle", "puggie", "pugs"],
            examples: [`${client.commandPrefix}pug`],
            description: "Posts a Pug Photo :D",
            group: "image"
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let result = Math.floor((Math.random() * Pug.length));
        let embed = new Discord.RichEmbed()
            .setColor("#FF000")
            .setDescription("<a:Dots:426956230582599690> Loading a Pug Photo, Please Wait....")

        message.channel.send(embed).then(message => {
            embed.setColor("RANDOM")
            embed.setDescription(`Here's a Photo of a Pug 😊 \n Link to Photo [Click Here](${Pug[result]})`)
            embed.setImage(Pug[result])
            embed.setFooter(`Pug Photo ${result}/${Pug.length}`)
            message.edit(embed)
        })
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}