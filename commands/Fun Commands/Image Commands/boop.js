const { Command } = require('../../../util/Commando'),
    { boops } = require('../../../util/photos.js'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "boop",
            memberName: "boop",
            aliases: [],
            examples: [`${client.commandPrefix}boop @user/userid`],
            description: "Posts a boop gif",
            group: "image",
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to boop?",
                    type: "user"
                }
            ]
        })
    }
    async run(message, { user }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if (user.id === message.author.id) return message.say(`You can't boop yourself Silly :wink:`)
        let result = Math.floor((Math.random() * boops.length));
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setImage(boops[result])
            .setAuthor(user.tag, user.displayAvatarURL)
            .setFooter(`Booped By: ${message.author.tag}`, message.author.displayAvatarURL)
        message.embed(embed)
        } catch (e) {
            this.client.error(this.client, message, e)
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}