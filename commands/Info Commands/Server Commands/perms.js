const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const {perms} = require('../../../util/perms.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "perms",
            memberName: "perms",
            aliases: [`permissions`, `perm`],
            examples: [`${client.commandPrefix}perms`],
            description: "Gives you all of the permissions you have or another member.",
            group: "server",
            guildOnly: true,
            args: [
                {
                    key: "member",
                    prompt: "What member do you want to see their permissions?",
                    type: "member",
                    default: message => message.member
                }
            ]
        })
    }
    async run(message, { member }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        const allowed = Object.entries(member.permissions.serialize()).filter(([perm, allowed]) => allowed).map(([perm]) => `${perms[perm]}`);
        let embed = new Discord.RichEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL)
            .setTitle(`Permissions`)
            .setDescription(allowed ? `${allowed.join("\n")}` : 'None')
            .setColor(`RANDOM`)
            if(member.hasPermission('MANAGE_ROLES' || 'MANAGE_MESSAGES' || "KICK_MEMBERS" || "BAN_MEMBERS")){
                embed.addField(`Moderator`, `Yes`, true)
            }
            if(member.hasPermission('ADMINISTRATOR' || 'MANAGE_GUILD')){
                embed.addField(`Admin`, `Yes`, true)
            }
        return message.say(embed)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}