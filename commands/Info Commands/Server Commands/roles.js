const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const request = require('superagent');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "roles",
            memberName: "roles",
            aliases: ["serverroles"],
            examples: [`${client.commandPrefix}roles`],
            description: "Gives you a list of all of the roles in the server.",
            group: "server",
            guildOnly: true
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
            let res = message.guild.roles.map(c => c);
            let embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
                .setTimestamp()
                .setTitle(`Roles List`)
            let embed2 = new Discord.RichEmbed()
                .setColor(`RANDOM`)
            let embed3 = new Discord.RichEmbed()
                .setColor(`RANDOM`)
            let embed4 = new Discord.RichEmbed()
                .setColor(`RANDOM`)
            let embed5 = new Discord.RichEmbed()
                .setColor(`RANDOM`)
            let embed6 = new Discord.RichEmbed()
                .setColor(`RANDOM`)
            //if there are no results
            let i;
            if (res.length === 0) {
                return message.channel.send(`There is no roles on this server!.`)
            } else 
            
            if (message.guild.roles.size < 15) {
               message.guild.roles.map(c => embed.addField(`${c.name}`, `**Role: **${c} \`${c.name}\` (${c.id})\n**Members Count: **${c.members.size}`))
            } else {
                for (i = 0; i < 25; i++) {
                    embed.addField(`${res[i].name}`, `**Role: **${res[i]} \`${res[i].name}\` (${res[i].id})\n**Members Count: **${res[i].members.size}`)
                }
                for (i = 25; i < 25; i++) {
                    embed2.addField(`${res[i].name}`, `**Role: **${res[i]} \`${res[i].name}\` (${res[i].id})\n**Members Count: **${res[i].members.size}`)
                }
                for (i = 50; i < 25; i++) {
                    embed3.addField(`${res[i].name}`, `**Role: **${res[i]} \`${res[i].name}\` (${res[i].id})\n**Members Count: **${res[i].members.size}`)
                }
                for (i = 75; i < 25; i++) {
                    embed4.addField(`${res[i].name}`, `**Role: **${res[i]} \`${res[i].name}\` (${res[i].id})\n**Members Count: **${res[i].members.size}`)
                }
                for (i = 100; i < 25; i++) {
                    embed5.addField(`${res[i].name}`, `**Role: **${res[i]} \`${res[i].name}\` (${res[i].id})\n**Members Count: **${res[i].members.size}`)
                }
                for (i = 125; i < 25; i++) {
                    embed6.addField(`${res[i].name}`, `**Role: **${res[i]} \`${res[i].name}\` (${res[i].id})\n**Members Count: **${res[i].members.size}`)
                }
            }

            message.channel.send(embed);
            if (embed2.fields.length !== 0) {
                message.channel.send(embed2)
            }
            if (embed3.fields.length !== 0) {
                message.channel.send(embed3)
            }
            if (embed4.fields.length !== 0) {
                message.channel.send(embed4)
            }
            if (embed5.fields.length !== 0) {
                message.channel.send(embed5)
            }
            if (embed6.fields.length !== 0) {
                message.channel.send(embed6)
            }
            
}catch(e){
    this.client.error(this.client, message, e);
  this.client.logger(this.client, message.guild, e.stack, message, message.channel)
}
    }
}
