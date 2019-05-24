const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "inviteinfo",
            memberName: "inviteinfo",
            aliases: [`ii`],
            examples: [`${client.commandPrefix}inviteinfo <Invite Here>`],
            description: "Gives you the infomation on the invite you provide.",
            group: "info",
            args: [
                {
                    key: 'link',
                    prompt: 'What discord invite do you want the info on?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { link }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try {
            this.client.fetchInvite(link).then(invite => {
                let icon = `https://cdn.discordapp.com/icons/${invite.guild.id}/${invite.guild.icon}.png`
                let e = new Discord.RichEmbed()
                    .setAuthor(invite.guild.name, icon)
                    .addField(`Invite`, `**Code: **${invite.code}\n**Link: ** https://discord.gg/${invite.code}`)
                    .addField(`Server`, `**Name: **${invite.guild.name}\n**ID: **${invite.guild.id}`, true)
                if (invite.channel !== undefined) {
                    e.addField(`Channel`, `**Name: **#${invite.channel.name}\n**Type: **${invite.channel.type}\n**ID: **${invite.channel.id}`, true)
                }
                if (invite.inviter !== undefined) {
                    e.addField(`Inviter`, `**User: **${invite.inviter}\n**Tag: **${invite.inviter.tag}\n**ID: **${invite.inviter.id}`, true)
                } else {
                    e.addField(`Inviter`, `No Owner for this invite`, true)
                }
                if (invite.guild.splash !== null) {
                    let splashURL = `https://cdn.discordapp.com/splashes/${invite.guild.id}/${invite.guild.splash}.png?size=2048`
                    e.addField(`Splash`, `[Click Here](${splashURL})`, true)
                    e.setThumbnail(icon)
                } else {
                    e.setThumbnail(icon)
                }
                e.setColor(`RANDOM`)
                if (invite.uses !== undefined) {
                    e.addField(`Uses`, invite.uses, true)
                }
                if (invite.maxAge !== undefined) {
                    e.addField(`Max Age`, invite.maxAge, true)
                }
                message.say(e)
            })
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}