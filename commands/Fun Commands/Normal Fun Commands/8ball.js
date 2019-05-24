const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "8ball",
            memberName: "8ball",
            aliases: ["8b"],
            examples: [`${client.commandPrefix}8ball Does this work?`],
            description: "Ask a question",
            group: "fun",
            throttling: {
            usages: 1,
            duration: 5
            },
            args: [
                {
                    key: "ball",
                    prompt: "What do you want to ask the magic 8ball",
                    type: "string"
                }
            ]
        })
    }
    async run(message, { ball }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let n = await neko.getSFW8Ball()
        let res = n.response;
        let link = n.url;
        if(res.toLowerCase() === "you're hot") res = "Ask Again";
        if(link === "https://cdn.nekos.life/8ball/Youre_hot.png") link = "https://cdn.nekos.life/8ball/Ask_Again.png"  
        let embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`**Question:** ${ball}\n**Answer:** ${res}`)
            .setImage(link);
        message.channel.send(embed);
        } catch (e) {
            this.client.error(this.client, message, e)
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
