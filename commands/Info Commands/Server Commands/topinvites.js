const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "topinvites",
            memberName: "topinvites",
            aliases: ["invites", "ti", "topinvite"],
            examples: [`${client.commandPrefix}invites`],
            description: "Gives you the top invites for the server",
            group: "server",
            guildOnly: true
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let invites = await message.guild.fetchInvites().catch(error => {
            return message.channel.send('Sorry, I don\'t have the proper permissions to view invites!');
        });

        invites = invites.array();

        let possibleinvites = [];
        invites.forEach(function (invites) {
            possibleinvites.push(`**${invites.inviter.username}**${' '.repeat(12 - invites.inviter.username.length)} - **${invites.uses}** uses - https://discord.gg/${invites.code}`)
        })
        if (possibleinvites.join('\n').length === 0) return message.say(`There is no invites for this server.`)
        const embed = new Discord.RichEmbed()
            .setTitle(`**INVITE LEADERBOARD**`)
            .setColor(`RANDOM`)
            .addField('Invites', `${possibleinvites.join('\n')}`)
            .setFooter(this.client.user.tag, this.client.user.avatarURL)
            .setTimestamp();
        message.channel.send({ embed });
        } catch (e) {
            this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}