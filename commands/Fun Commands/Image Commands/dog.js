const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js'),
    superagent = require('superagent');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "dog",
            memberName: "dog",
            aliases: ["doggo", "puppy"],
            examples: [`${client.commandPrefix}dog`],
            description: "Posts a random Dog Photo",
            group: "image"
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let { body } = await superagent
            .get(`https://dog.ceo/api/breeds/image/random`);
        if (body.status === "success") {
            let embed = new Discord.RichEmbed()
                .setColor("#FF000")
                .setDescription("<a:Dots:426956230582599690> Loading the Photo..")

            message.channel.send(embed).then(message => {
                embed.setColor("RANDOM")
                embed.setDescription("Here's a Photo of a Dog 😊")
                embed.setImage(body.message)
                message.edit(embed)
            })
        } 
    }catch(e){
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
            message.say(new Discord.RichEmbed().setAuthor(this.client.user.tag, this.client.user.displayAvatarURL).setTitle(`API ERROR`).setDescription(`Please Try again.`))
    }
    }
}