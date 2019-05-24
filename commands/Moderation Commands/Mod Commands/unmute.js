const { Command } = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "unmute",
            memberName: "unmute",
            aliases: ["unsilence", "uncalm"],
            examples: [`${client.commandPrefix}unmute @user/userid`],
            description: "Unmutes a member",
            guildOnly: true,
            group: "mod",
            args: [
                {
                    key: "member",
                    prompt: "What member do you want me to mute?",
                    type: "member"
                }
            ]
        })
    }
    async run(message, { member }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_MESSAGES")) return;
        try{
        let muterole = message.guild.roles.find(r => r.name === "Muted") || message.guild.roles.find(r => r.name === "muted")
        await (member.removeRole(muterole.id));
        message.channel.send(`✅ ***${member.user.tag} Has Been Unmuted!***`);
        message.delete().catch();
        } catch (e) {
            this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
