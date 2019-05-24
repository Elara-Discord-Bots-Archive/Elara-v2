const { Command } = require('../../../util/Commando'),
    randomPuppy = require('random-puppy'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "meme",
            memberName: "meme",
            aliases: [],
            examples: [`${client.commandPrefix}meme`],
            guildOnly: true,
            description: "Gives you a meme",
            group: "image"
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if(message.guild){
        if(!message.channel.nsfw){
            return message.channel.send(`You can't do the command in this channel`)
        }
        const subreddits = [
            "meme"
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
            .then(url => {
                if (!url) return message.say(`Didn't find one try again.`)
                let user = message.author;
                let userurl = message.author.displayAvatarURL;
                const embed = new Discord.RichEmbed()
                    .setColor(`RANDOM`)
                    .setDescription(`<a:Dots:426956230582599690> Loading......`)
                message.channel.send(embed).then(message => {
                    embed.setColor(`RANDOM`)
                    embed.setDescription(`Here is your meme!\n[Click Here](${url})`)
                    embed.setImage(url)
                    embed.setFooter(`Requested By ${user.tag}`, userurl)
                    message.edit(embed);
                })
            })
        }else{
            const subreddits = [
                "meme"
            ]
            var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

            randomPuppy(sub)
                .then(url => {
                    if (!url) return message.say(`Didn't find one try again.`)
                    let user = message.author;
                    let userurl = message.author.displayAvatarURL;
                    const embed = new Discord.RichEmbed()
                        .setColor(`RANDOM`)
                        .setDescription(`<a:Dots:426956230582599690> Loading......`)
                    message.channel.send(embed).then(message => {
                        embed.setColor(`RANDOM`)
                        embed.setDescription(`Here is your meme!\n[Click Here](${url})`)
                        embed.setImage(url)
                        embed.setFooter(`Requested By ${user.tag}`, userurl)
                        message.edit(embed);
                    })
                })
        }
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}