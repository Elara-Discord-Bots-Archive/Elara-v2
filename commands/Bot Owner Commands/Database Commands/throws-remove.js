const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "throwremove",
            memberName: "throwremove",
            aliases: [`removethrow`],
            examples: [`${client.commandPrefix}throw-`],
            description: "Remove a throw from the database.",
            group: "owner",
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.owner(this.client, message)) return;
        try{
        let bot = this.client
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`Removing Throw`)
            .setFooter(bot.user.username, bot.user.displayAvatarURL)
        this.client.throw.findOne({ clientID: bot.user.id }, (err, db) => {
            if (!db) {
                embed.setDescription(`**No Throws to remove.**`);
                message.channel.send(embed)
            } else {
                let listText = ``
                let num = 0
                db.list.forEach(n => {
                    num++
                    listText += `${num}: ${n}\n`
                });
                listText += `\n**Type a Throw number to remove.**\n**Type: \`cancel\` to cancel this selection**`
                embed.setDescription(listText);
                message.channel.send(embed).then((msg) => {
                    message.channel.awaitMessages(m => Number(m.content) > 0 && Number(m.content) <= db.list.length && m.author.id == message.author.id, { max: 1, time: 20000, errors: ['time'] })
                    .then((collected) => {
                        let embed = new Discord.RichEmbed()
                        .setColor(this.client.util.colors.green)
                        .setDescription(`Removing Todo: ${db.list[Number(collected.first().content) - 1]}`)
                        message.say(embed).then(ms => ms.delete(20000));
                        let newdb = []
                        let num = 0
                        db.list.forEach(n => {
                            num++
                            if (Number(collected.first().content) !== num) {
                                newdb.push(n)
                            }
                        });
                        db.list = newdb;
                        db.save().catch(err => console.log(err));
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