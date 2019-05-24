const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "membercount",
            memberName: "membercount",
            aliases: ["mc"],
            examples: [`${client.commandPrefix}mc`],
            description: "Gives you the membercount for your server.",
            group: "server",
            guildOnly: true
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let serverSize = await message.guild.memberCount;
        let botCount = await message.guild.members.filter(m => m.user.bot).size;
        let humanCount = await serverSize - botCount;
        const embed = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL ? message.guild.iconURL : "https://cdn.discordapp.com/emojis/483118381650804747.gif")
            .setColor(`RANDOM`)
            .setTimestamp()
            .addField(`Members`, `**${serverSize}**`, true)
        if (message.guild.members.get('248947473161256972')) {
            let val = message.guild.members.get("248947473161256972");
            embed.addField(`Humans`, `**${humanCount}**\n**1** ${val.displayName ? val.displayName : val.user.username}`, true)
            embed.addField(`Bots`, `**${botCount}**`, true)
            embed.addField(`Member Statuses`, `**${this.client.util.status.online}${message.guild.members.filter(o => o.presence.status === 'online').size}** Online\n**${this.client.util.status.idle} ${message.guild.members.filter(i => i.presence.status === 'idle').size}** Idle\n**${this.client.util.status.dnd}${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** DND\n** ${this.client.util.status.offline}${message.guild.members.filter(off => off.presence.status === 'offline').size}** Offline`, true)
        } else {
            embed.addField(`Humans`, `**${humanCount}**`, true)
            embed.addField(`Bots`, `**${botCount}**`, true)
            embed.addField(`Member Statuses`, `**${this.client.util.status.online}${message.guild.members.filter(o => o.presence.status === 'online').size}** Online\n**${this.client.util.status.idle} ${message.guild.members.filter(i => i.presence.status === 'idle').size}** Idle\n**${this.client.util.status.dnd}${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** DND\n** ${this.client.util.status.offline}${message.guild.members.filter(off => off.presence.status === 'offline').size}** Offline`, true)
        }
        message.channel.send(embed)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}