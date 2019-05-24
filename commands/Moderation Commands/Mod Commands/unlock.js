const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
let ms = require('ms');
module.exports = class LockDownCommand extends Command {
    constructor(client) {
        super(client, {
            name: "unlock",
            memberName: "unlock",
            aliases: ["unl"],
            group: "mod",
            guildOnly: true,
            examples: [`${client.commandPrefix}unlock`],
            description: "Unlocks the channel you run the command in."
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        if (this.client.perms(this.client, message, "MANAGE_MESSAGES")) return;
        try {
            message.delete(10000).catch()
            message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: null
            });
            const lockembed = new Discord.RichEmbed()
                .setColor(`#FF000`)
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setTitle(`UNLOCKED`)
                .setTimestamp()
                .setDescription(`This channel is now unlocked\n**Action By: **${message.author}`)
            message.channel.send(lockembed)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}