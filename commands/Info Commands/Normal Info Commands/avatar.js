const { Command } = require('../../../util/Commando');
const Discord = require('discord.js');
module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: "avatar",
            memberName: "avatar",
            group: "info",
            description: "Shows user's avatar.",
            examples: [`${client.commandPrefix}avatar`],
            args: [
                {
                    key: "user",
                    prompt: "What user do you want the profile photo from?",
                    type: "user"
                }
            ]
        });
    }
    async run(message, { user }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
            if (user.displayAvatarURL.toLowerCase().includes(".gif")) {
                let gimage = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=2048`;
                let embed = new Discord.RichEmbed()
                    .setColor(`RANDOM`)
                    .setAuthor(user.tag, user.displayAvatarURL)
                    .setDescription(`[Avatar](${gimage})`)
                    .setImage(gimage)
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL)
                message.say(embed)
            } else {
                let rimage = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=2048`;
                let embed = new Discord.RichEmbed()
                    .setColor(`RANDOM`)
                    .setAuthor(user.tag, user.displayAvatarURL)
                    .setDescription(`[Avatar](${rimage})`)
                    .setImage(rimage)
                    .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL)
                message.say(embed)
            }
        }catch(e){
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}