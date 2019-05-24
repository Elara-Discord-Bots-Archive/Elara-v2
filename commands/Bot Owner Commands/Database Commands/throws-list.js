const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "throwlist",
            memberName: "throwlist",
            aliases: [`throw=`],
            examples: [`${client.commandPrefix}throw=`],
            description: "Shows all of the throws currently.",
            group: "owner",
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        if (this.client.owner(this.client, message)) return;
        try{
        let bot = this.client;
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`The current throw list.`)
            .setDescription(`Unknown Error`)
            .setFooter(bot.user.tag, bot.user.displayAvatarURL)
            .setTimestamp()
        this.client.throw.findOne({ clientID: bot.user.id}, (err, db) => {
            if (!db) {
                embed.setDescription(`**No Database has been added.**`);
                message.channel.send(embed)
            } else {
                let dbText = ``
                let num = 0
                db.list.forEach(n => {
                    num++
                    dbText += `**${num}**: ${n}\n`
                });
                if (dbText === ``) {
                    dbText = `**No Throws yet.**`
                }
                embed.setDescription(dbText);
                message.channel.send(embed)
            }
        });
        } catch (e) {
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}