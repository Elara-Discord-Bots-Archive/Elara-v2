const { Command } = require('../../../util/Commando'),
    warnings = require("../../../util/models/warnings.js"),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "clearwarn",
            memberName: "clearwarn",
            aliases: [`clearwarns`],
            examples: [`${client.commandPrefix}clearwarn @user`],
            description: "Removes a warning from the person you mention.",
            group: "mod",
            guildOnly: true,
            args: [
                {
                    key: "member",
                    prompt: "What member do you want to remove the warn from?",
                    type: "member"
                }
            ]
        })
    }
    async run(message, {member}) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_MESSAGES")) return;
        try{
        let bot = this.client
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`Removing Warning`)
            .setDescription(`Unknown Error`)
            .setFooter(bot.user.username, bot.user.displayAvatarURL)
        warnings.findOne({ userID: member.id, guildID: message.guild.id }, (err, db) => {
            if (!db) {
                embed.setDescription(`**No Warnings to remove.**`);
                message.channel.send(embed)
            } else 
            if(db.warns.length === 0){
                embed.setDescription(`**No Warnings to remove**`);
                message.channel.send(embed)
            }else{
                let listText = ``
                let num = 0
                db.warns.forEach(n => {
                    num++
                    listText += `**${num}**. ${n}\n`
                });
                listText += `\n**Type a Warning number to remove.**\n**Note: **To cancel this selection just wait 20 seconds`
                embed.setDescription(listText);
                message.channel.send(embed).then(async (msg) => {
                    message.channel.awaitMessages(m => Number(m.content) > 0 && Number(m.content) <= db.warns.length && m.author.id == message.author.id, { max: 1, time: 20000, errors: ['time'] })
                    .then(async (collected) => {
                        collected.first().delete().catch()
                        message.delete(20000).catch()
                        let embed = new Discord.RichEmbed()
                        .setColor(this.client.util.colors.green)
                        .setDescription(`Removing Warning: ${db.warns[Number(collected.first().content) - 1]}`)
                        message.say(embed).then(ms => ms.delete(20000));
                        let newlists = []
                        let num = 0
                        db.warns.forEach(n => {
                            num++
                            if (Number(collected.first().content) !== num) {
                                newlists.push(n)
                            }
                        });
                        db.warns = newlists;
                        db.save().catch(err => console.log(err));
                        msg.delete();
                        let e = new Discord.RichEmbed()
                        .setColor(this.client.util.colors.green)
                        .setDescription(`Removed.`)
                        message.channel.send(e).then(ms => ms.delete(20000));
                    }).catch((err) => {
                        let e = new Discord.RichEmbed()
                        .setColor(this.client.util.colors.red)
                        .setDescription(`Canceled`)
                        message.channel.send(e).then(m => m.delete(5000));
                        msg.delete();
                    });
                });
            }
        });
        } catch (e) {
            this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}