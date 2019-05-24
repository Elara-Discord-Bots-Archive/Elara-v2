const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "throw",
            memberName: "throw",
            aliases: [],
            examples: [`${client.commandPrefix}throw @user/userid`],
            description: "Throw something at the user",
            group: "fun",
            throttling: {
            usages: 1,
            duration: 5
            },
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to throw something at?",
                    type: "user"
                },
                {
                    key: "object",
                    prompt: "What do you want to throw?",
                    type: "string",
                    default: "random"
                }
            ]
        })
    }
    async run(message, { user, object }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if(object.toLowerCase() === "random"){
        await this.client.throw.findOne({clientID: this.client.user.id}, async (err, db) => {
        if(db.list.length === 0){
            if(object.toLowerCase() === "random"){
                let embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setDescription(`Threw **Nothing** at **${user}**`)
            message.channel.send(embed);
            }else{
                let embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setDescription(`Threw **${object}** at **${user}**`)
            message.channel.send(embed);
            }
        }else{
        let list = db.list
        let random = Math.floor(Math.random() * list.length)
        let embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`Threw **${list[random]}** at **${user}**`)
        message.channel.send(embed);
        }
        })
        }else{
            let embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setDescription(`Threw **${object}** at **${user}**`)
            message.channel.send(embed);
        }
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
