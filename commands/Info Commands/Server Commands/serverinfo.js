const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "serverinfo",
            memberName: "serverinfo",
            aliases: ["guildinfo", "si", "gi"],
            examples: [`${client.commandPrefix}serverinfo`],
            description: "Gives you a all of the information about the guild.",
            group: "server",
            guildOnly: true
        })
    }
    async run(msg) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let status = this.client.util.status;
        let guild = msg.guild
        let prefix = guild._commandPrefix ? guild._commandPrefix : this.client.commandPrefix;
        let fields = []
        fields.push(
            {
                name: '❯\u2000\Server Name',
                value: `**${guild.name}**`,
                inline: true
            },
            {
                name: `❯\u2000\Server ID`,
                value: `${guild.id}`,
                inline: true
            },
            {
                name: `❯\u2000\Server Icon`,
                value: `${guild.iconURL ? `[Click Here](${guild.iconURL})` : "None"}`,
                inline: true
            },
            {
                name: '❯\u2000\Owner',
                value: `${guild.owner}`,
                inline: true
            },
            {
                name: '❯\u2000\Owner ID',
                value: `${guild.ownerID}`,
                inline: true
            },
            {
                name: '❯\u2000\Verification Level',
                value: `${this.client.util.verifLevels[guild.verificationLevel]}`,
                inline: true
            },
            {
                name: `❯\u2000\Region`,
                value: `${this.client.util.region[guild.region]}`,
                inline: true
            },
            {
                name: '❯\u2000\Total Members',
                value: `${guild.memberCount}`,
                inline: true
            },
            {
                name: `❯\u2000\Total Humans`,
                value: `${guild.members.filter(m => !m.user.bot).size}`,
                inline: true
            },
            {
                name: `❯\u2000\Total Bots`,
                value: `${guild.members.filter(m => m.user.bot).size}`,
                inline: true
            },
            {
                name: '❯\u2000\Role Count',
                value: `${guild.roles.size}`,
                inline: true
            },
            {
                name: '❯\u2000\Partnership',
                value: `${guild.features.length === 0 ? 'No' : `Yes, features: ${guild.features.map(feature => `\`${feature}\``).join(', ')}`}`,
                inline: true
            },
            {
                name: `❯\u2000\Created At`,
                value: `${guild.createdAt.toString().substr(0, 15)},\n${this.client.functions.days(guild.createdAt)}`,
                inline: true
            },
            {
                name: `❯\u2000\Server Roles`,
                value: `Do \`${prefix}roles\``,
                inline: true
            },
            {
                name: `❯\u2000\Server Channels`,
                value: `Do \`${prefix}channels\``,
                inline: true
            },
            {
                name: `❯\u2000\Server Emojis`,
                value: `Do \`${prefix}emojis\``,
                inline: true
            },
                        {
                name: '❯\u2000\Channels',
                value: `
                **${guild.channels.filter(c => c.type == "text").size}** Text
                **${guild.channels.filter(c => c.type == "voice").size}** Voice
                **${guild.channels.filter(c => c.type == "category").size}** Category`,
                inline: true
            },
            {
                name: `❯\u2000\Member Statuses`,
                value: `
                **${status.online}${guild.members.filter(o => o.presence.status === 'online').size}** Online
                **${status.idle} ${guild.members.filter(i => i.presence.status === 'idle').size}** Idle
                **${status.dnd}${guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** DND
                **${status.offline}${guild.members.filter(off => off.presence.status === 'offline').size}** Offline`,
                inline: true
            }
        )
        msg.channel.send({
            embed: {
                timestamp: new Date(msg.timestamp),
                color: 0xFF000,
                thumbnail: {
                    url: guild.iconURL ? guild.iconURL : `http://www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png`
                },
                fields: fields
            }
        })
        } catch (e) {
            this.client.error(this.client, msg, e);
        this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
        }
    }

}