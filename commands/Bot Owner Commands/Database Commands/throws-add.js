const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "addthrow",
            memberName: "addthrow",
            aliases: [`throw+`],
            examples: [`${client.commandPrefix}throw+ New throw`],
            description: "Adds a throw to the database.",
            group: "owner",
            args: [
                {
                    key: "newthrow",
                    prompt: "What do you want to add to your todo list?",
                    type: "string"
                }
            ]
        })
    }
    async run(message, { newthrow }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if (this.client.owner(this.client, message)) return;
        try{
        let bot = this.client;
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`Adding Throw`)
            .setFooter(bot.user.tag, bot.user.displayAvatarURL)
            .setTimestamp()
        this.client.throw.findOne({ clientID: bot.user.id }, (err, db) => {
            if(!db){
                const throws = new this.client.throw({
                    clientName: this.client.user.username,
                    clientID: this.client.user.id,
                    list: [newthrow]
                });
                throws.save().catch(err => console.log(err))
                embed.setDescription(`${db.list.length}: ${newthrow}`);
               return message.channel.send(embed)
            }else{
                db.list.push(newthrow)
                db.save().catch(err => console.log(err));
                embed.setDescription(`${db.list.length}: ${newthrow}`);
                return message.channel.send(embed)
            }
        });
        } catch (e) {
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}