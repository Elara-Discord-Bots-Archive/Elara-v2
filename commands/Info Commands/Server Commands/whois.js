const {Command} = require('../../../util/Commando'),
       Discord = require('discord.js');
const moment = require('moment')
require('moment-duration-format')
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'whois',
             memberName: 'whois',
             aliases: [`whoami`, "wi"],
             examples: [`${client.commandPrefix}whois @user/userid`],
             description: 'Posts the information about the member you mention',
             group: 'server',
             guildOnly: true,
             throttling: {
                   usages: 2,
                   duration: 3
            },
            args: [
                {
                    key: 'member',
                    prompt: 'What member do you want to checkout?',
                    type: 'member',
                    default: message => message.member
                }
              ]
})
}
        async run(message, {member}) {
            this.client.stats(this.client, "cmd", null, null, null)
            try{
        let types = [
            "Playing",
            "Streaming",
            "Listening",
            "Watching"
        ]
        let status = {
            "online": "Online",
            "idle": "Idle",
            "dnd": "DND",
            "offline": "Offline"
        }
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setThumbnail(member.user.displayAvatarURL)
            .setTimestamp()
            .addField(`Mention`, member.user, true)
            .addField(`Tag`, member.user.tag, true)
            .addField(`Name`, member.user.username, true)
            .addField(`Nickname`, member.nickname ? member.nickname : 'No Nickname', true)
            .addField(`User ID`, member.id, true)
            .addField(`Discriminator`, `#${member.user.discriminator}`, true)
            .addField(`Avatar`, `[Click Here](${member.user.displayAvatarURL})`, true)
            if(member.user.displayAvatarURL.toLowerCase().includes('.gif')){
                embed.addField(`Nitro/Partner`, `Nitro/Partner User`, true)
            }else{
                embed.addField(`Nitro/Partner`, `Normal User`, true)
            }
            embed.addField(`Bot`, member.user.bot ? `Yes ${this.client.util.emojis.robot}` : `No ${this.client.util.emojis.human}`, true)
            if(this.client.isOwner(member.user.id)){embed.addField(`Bot Owner`, `${this.client.isOwner(member.user.id) ? "Yes, Hi Boss <:SmileyHearts:485361754633797654>" : "No"}`, true)}
            embed.addField(`Created & Joined At`, `
            **Created Account At: **${moment(member.user.createdAt).format('MMMM Do YYYY')}
            **Joined Server At: **${moment(member.joinedAt).format('MMMM Do YYYY')}
            `, false)
            if (member.presence.game !== null) { embed.addField(`Playing Status`, `**Status:** ${this.client.util.status[member.presence.status]} ${status[member.presence.status]}\n${member.presence.game ? `**Game:** ${member.presence.game.name}` : ''}\n**Type:** ${types[member.presence.game.type]}`, true) }
            embed.addBlankField()
            embed.addField('Highest Role', `
            **Name: **${member.roles.size > 1 ? member.highestRole : 'None'}
            ${member.roles.size > 1 ? `**ID: **${member.highestRole.id}` : ""}
            ${member.roles.size > 1 ? `**Hoisted: **${member.highestRole.hoist ? "Yes" : ""}` : ""}
            `, true)
            embed.addField(`Permissions`, `Do \`${this.client.commandPrefix}perms @${member.user.tag}\``, true)
            embed.addField(`Roles`, member.roles.size > 1 ? this.client.functions.arrayClean(null, member.roles.map((r) => {if (r.name !== '@everyone') {return r;}return null;})).join(' | ') : 'None', false)
            embed.setFooter(`Want to see another members info? Do ${this.client.commandPrefix}whois @user/userid`)
            message.say(embed)
            } catch (e) {
                this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
            }
}
}
