const { Command } = require('../../../util/Commando'),
    list = require('../../../util/models/model-todo.js'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "todolist",
            memberName: "todolist",
            aliases: [`todo=`, "todos"],
            examples: [`${client.commandPrefix}todolist`],
            description: "View the todo list you currently have.",
            group: "info",
            guildOnly: true
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`Your current todo list`)
            .setDescription(`Unknown Error`)
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL)
        list.findOne({ userID: message.author.id }, (err, list) => {
            if (!list) {
                embed.setDescription(`**There isn't any todos for you, Do ${message.guild._commandPrefix ? message.guild._commandPrefix : this.client.commandPrefix}todo+ <New todo>**`);
                message.channel.send(embed)
            } else {
                let listText = ``
                let num = 0
                list.list.forEach(n => {
                    num++
                    listText += `**${num}**: ${n}\n`
                });
                if (listText === ``) {
                    listText = `**No Todos**`
                }
                embed.setDescription(listText);
                message.channel.send(embed)
            }
        });
        } catch (e) {
            this.client.error(this.client, message, e)
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
