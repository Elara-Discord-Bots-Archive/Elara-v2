const { Command } = require('../../../util/Commando'),
    list = require('../../../util/models/blacklist.js'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "blacklist-list",
            memberName: "blacklist-list",
            aliases: [`blacklist=`, "bl="],
            examples: [`${client.commandPrefix}bl=`],
            description: "View the current blacklisted servers",
            group: "owner",
            ownerOnly: true
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let bot = this.client;
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`Current Blacklisted Servers`)
            .setDescription(`Unknown Error`)
            .setFooter(bot.user.username, bot.user.displayAvatarURL)
        list.findOne({ clientID: bot.user.id }, (err, list) => {
            if (!list) {
                embed.setDescription(`**No Servers are blacklisted.**`);
                message.channel.send(embed)
            } else {
                let listText = ``
                let num = 0
                list.list.forEach(n => {
                    num++
                    listText += `**${num}**: ${n}\n`
                });
                if (listText === ``) {
                    listText = `**No Servers**`
                }
                embed.setDescription(listText);
                message.channel.send(embed)
            }
        });
        } catch (e) {
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}