const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "channels",
            memberName: "channels",
            aliases: [],
            examples: [`${client.commandPrefix}channels`],
            description: "Gives you all of the channels in the server.",
            group: "server",
            guildOnly: true
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let textchannels = message.guild.channels.filter(c => c.type == "text").map(c => `<#${c.id}>`).join(", ");
        let voicechannels = message.guild.channels.filter(c => c.type == "voice").map(c => `${c.name}`).join(", ");
        let categorys = message.guild.channels.filter(c => c.type == "category").map(c => `${c.name}`).join(", ")
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`**Text Channels**`)
            .setTimestamp()
            .setDescription(textchannels ? textchannels : "None")
            .addField(`Voice Channels`, voicechannels ? voicechannels : "None")
            .addField(`Categorys`, categorys ? categorys : "None")
        message.channel.send(embed)
        }catch(e){
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}