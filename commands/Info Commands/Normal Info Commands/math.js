const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js'),
    math = require('mathjs');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "math",
            memberName: "math",
            aliases: [],
            examples: [`${client.commandPrefix}math 1+1`],
            description: "Gives you the answer to the math question you ask.",
            group: "info",
            args: [
                {
                    key: 'content',
                    prompt: 'What math calculation do you want the answer for?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let resp;
        try {
            resp = math.eval(content);
        } catch (e) {
            return message.channel.send(`Sorry, Please Input a Valid Calculation!`)
        }
        const embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`Math Calculation`)
            .addField(`Input`, `${content}`)
            .addField(`Output`, `${resp}`)
        message.channel.send(embed)
    }catch(e){
        this.client.error(this.client, message, e);
   this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
    }
}