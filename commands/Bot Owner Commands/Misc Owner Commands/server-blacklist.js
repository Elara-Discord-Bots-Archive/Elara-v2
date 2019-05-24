const { Command } = require('../../../util/Commando'),
    list = require('../../../util/models/blacklist.js'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "blacklist",
            memberName: "blacklist",
            aliases: [`blacklist+`, "bl+"],
            examples: [`${client.commandPrefix}blacklist <server id>`],
            description: "Adds a new server id to the blacklisted db",
            group: "owner",
            ownerOnly: true,
            args: [
                {
                    key: "server",
                    prompt: "What server do you want me to blacklist?",
                    type: "string"
                }
            ]
        })
    }
    async run(message, { server }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let bot = this.client;
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`Adding ${server} to the blacklist db`)
            .setDescription(`Unknown Error`)
            .setFooter(bot.user.username, bot.user.displayAvatarURL)
        list.findOne({ clientID: bot.user.id }, (err, lists) => {
            if (lists.list.includes(server)) return message.channel.send(`That server is already blacklisted!`)
            if (!lists) {
                const newlist = new list({
                    clientID: this.client.user.id,
                    clientName: this.client.user.username,
                    list: [server]
                });
                newlist.save().catch(err => console.log(err));
                embed.setDescription(`1: ${server}`);
                message.channel.send(embed)
            } else {
                lists.list.push(server)
                lists.save().catch(err => console.log(err));
                embed.setDescription(`${lists.list.length}: ${server}`);
                message.channel.send(embed)
            }
        });
        } catch (e) {
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}