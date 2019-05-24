const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class AdCheckCommand extends Command {
    constructor(client) {
        super(client, {
            name: "adcheck",
            group: "mod",
            aliases: [],
            memberName: "adcheck",
            guildOnly: true,
            examples: [`${client.commandPrefix}adcheck`],
            description: "Checks for discord invites in users playing statuses"
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_MESSAGES")) return;
        try{
        const members = message.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name));
        const adchecker = members.map(member => `${member} (${member.id})`).join("\n") || "No invite links found."
        const embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`Discord invites in these users playing statuses`)
            .setDescription(adchecker)
        message.say(embed)
        } catch (e) {
            this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}