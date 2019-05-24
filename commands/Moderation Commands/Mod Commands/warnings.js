const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "warns",
            memberName: "warns",
            aliases: [`warnings`, `warning`],
            examples: [`${client.commandPrefix}warns @user`],
            description: "View the current warnings for that user.",
            group: "mod",
            guildOnly: true,
            args: [
                {
                    key: "member",
                    prompt: "What member do you want to check the warnings of?",
                    type: "member"
                }
            ]
        })
    }
    async run(message, {member}) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_MESSAGES")) return;
        try{
        let bot = this.client;
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter(bot.user.username, bot.user.displayAvatarURL)
        this.client.warns.findOne({ userID: member.id, guildID: message.guild.id }, async (err, db) => {
            if (!db) {
                embed.setDescription(`There isn't any warns for that member!`)
                message.channel.send(embed)
            } else {
                let num = 0;
                embed.setDescription(`**__Warnings For__**\n**Member: **${member} \`${member.user.tag}\` (${member.id})`)
                embed.setTitle(`Number of Warnings: [**${db.warns.length}**]`)
                db.warns.forEach(m => {
                    num++
                    embed.addField(`Warning: [${num}]`, m)
                })
            
            return message.channel.send(embed)
            }
        });
        } catch (e) {
            this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}