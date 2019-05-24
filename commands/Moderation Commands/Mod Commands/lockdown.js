const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
let ms = require('ms');
module.exports = class LockDownCommand extends Command {
    constructor(client) {
        super(client, {
            name: "lockdown",
            memberName: "lockdown",
            aliases: ["ld"],
            group: "mod",
            guildOnly: true,
            examples: [`${client.commandPrefix}lockdown`],
            description: "Locks down the channel you run the command in."
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_MESSAGES")) return;
        try{
        message.delete(10000).catch()
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        });
        const lockembed = new Discord.RichEmbed()
        .setColor(`#FF0000`)
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setTitle(`LOCKDOWN`)
        .setTimestamp()
        .setDescription(`This channel is now locked\n**Action By: **${message.author}`)
        message.channel.send(lockembed)
    } catch (e) {
        this.client.error(this.client, message, e);
    this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
    }
}