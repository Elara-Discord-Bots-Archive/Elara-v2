const { Command } = require('../../../util/Commando'),
    list = require('../../../util/models/blacklist.js'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "blacklistremove",
            memberName: "blacklistremove",
            aliases: [`br`],
            examples: [`${client.commandPrefix}bl-`],
            description: "Removes a server from the blacklist",
            group: "owner",
            ownerOnly: true
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let bot = this.client
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`Removing Server`)
            .setDescription(`Unknown Error`)
            .setFooter(bot.user.username, bot.user.displayAvatarURL)
        list.findOne({ clientID: this.client.user.id }, (err, lists) => {
            if (!lists) {
                embed.setDescription(`**No Servers to remove.**`);
                message.channel.send(embed)
            } else {
                let listText = ``
                let num = 0
                lists.list.forEach(n => {
                    num++
                    listText += `${num}: ${n}\n`
                });
                listText += `\n**Type a Server number to remove.**\n**Type: \`cancel\` to cancel this selection**`
                embed.setDescription(listText);
                message.channel.send(embed).then((msg) => {
                    message.channel.awaitMessages(m => Number(m.content) > 0 && Number(m.content) <= lists.list.length && m.author.id == message.author.id, { max: 1, time: 20000, errors: ['time'] })
                    .then((collected) => {
                        let embed = new Discord.RichEmbed()
                        .setColor(this.client.util.colors.green)
                        .setDescription(`Removed Server: ${lists.list[Number(collected.first().content) - 1]}`)
                        message.say(embed).then(ms => ms.delete(20000));
                        let newlists = []
                        let num = 0
                        lists.list.forEach(n => {
                            num++
                            if (Number(collected.first().content) !== num) {
                                newlists.push(n)
                            }
                        });
                        lists.list = newlists;
                        lists.save().catch(err => console.log(err));
                        msg.delete();
                        let e = new Discord.RichEmbed()
                        .setColor(this.client.util.colors.green)
                        .setDescription(`Successfully removed.`)
                        message.channel.send(e).then(ms => ms.delete(20000));
                    }).catch((err) => {
                        let e = new Discord.RichEmbed()
                        .setColor(this.client.util.colors.red)
                        .setDescription(`Successfully Canceled`)
                        message.channel.send(e).then(m => m.delete(5000));
                        msg.delete();
                    });
                });
            }
        });
        } catch (e) {
        this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
        }
    }
}
