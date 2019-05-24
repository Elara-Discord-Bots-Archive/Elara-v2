const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class RUSERCommand extends Command {
    constructor(client) {
        super(client, {
            name: "randomuser",
            memberName: "randomuser",
            aliases: ["ruser"],
            guildOnly: true,
            group: "server",
            examples: [`${client.commandPrefix}ruser\n${client.commandPrefix}ruser <role name here>`],
            description: "Gets a random user from everyone in the server or from a certain role",
            args: [
                {
                    key: "role",
                    prompt: "What role do you want me to pick a winner from?",
                    type: "role",
                    default: ""
                }
            ]
        })
    }
    async run (message, {role}) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if(role.length !== 0){
        let randomuser = role.members.map(c => c.user);
        let r = Math.floor(Math.random() * randomuser.length);
        let e = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setDescription(`Winner: ${randomuser[r]}`)
        message.say(e)    
        }else
        if(role.length === 0){
        let randomuser = message.guild.members.map(c => c.user);
        let r = Math.floor(Math.random() * randomuser.length);
        let e = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setDescription(`Winner: ${randomuser[r]}`)
        message.say(e)
        }
        } catch (e) {
            this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}