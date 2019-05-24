const { Command } = require('../../../util/Commando'),
    list = require('../../../util/models/model-todo.js'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "todoremove",
            memberName: "todoremove",
            aliases: [`removetodo`, 'todo-'],
            examples: [`${client.commandPrefix}todoremove`],
            description: "Remove a todo from your list.",
            group: "info",
            guildOnly: true
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`Removing Todo`)
            .setDescription(`Unknown Error`)
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL)
        list.findOne({ userID: message.author.id }, (err, lists) => {
            if (!lists) {
                embed.setDescription(`**No Todos to remove.**`);
                message.channel.send(embed)
            } else {
                let listText = ``
                let num = 0
                lists.list.forEach(n => {
                    num++
                    listText += `${num}: ${n}\n`
                });
                listText += `\n**Type a Todo number to remove.**\n**Type: \`cancel\` to cancel this selection**`
                embed.setDescription(listText);
                message.channel.send(embed).then((msg) => {
                    message.channel.awaitMessages(m => Number(m.content) > 0 && Number(m.content) <= lists.list.length && m.author.id == message.author.id, { max: 1, time: 20000, errors: ['time'] })
                    .then((collected) => {
                        let embed = new Discord.RichEmbed()
                        .setColor(this.client.util.colors.green)
                        .setDescription(`Removing: ${lists.list[Number(collected.first().content) - 1]}`)
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
            this.client.error(this.client, message, e)
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}