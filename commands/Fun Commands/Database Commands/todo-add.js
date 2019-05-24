const { Command } = require('../../../util/Commando'),
    list = require('../../../util/models/model-todo.js'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "addtodo",
            memberName: "addtodo",
            aliases: [`todo+`],
            examples: [`${client.commandPrefix}addtodo New todo`],
            description: "Adds a todo for your clipboard.",
            group: "info",
            guildOnly: true,
            args: [
                {
                    key: "newtodo",
                    prompt: "What do you want to add to your todo list?",
                    type: "string"
                }
            ]
        })
    }
    async run(message, { newtodo }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let bot = this.client;
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`Adding Todo`)
            .setDescription(`Unknown Error`)
            .setFooter(bot.user.username, bot.user.displayAvatarURL)
        list.findOne({ userID: message.author.id }, (err, lists) => {
            if (!lists) {
                const newlist = new list({
                    userID: message.author.id,
                    userName: message.author.tag,

                    list: [newtodo]
                });

                newlist.save().catch(err => console.log(err));
                embed.setDescription(`1: ${newtodo}`);
                message.channel.send(embed)
            } else {
                lists.list.push(newtodo)
                lists.save().catch(err => console.log(err));
                embed.setDescription(`${lists.list.length}: ${newtodo}`);
                message.channel.send(embed)
            }
        });
        } catch (e) {
            this.client.error(this.client, message, e)
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}