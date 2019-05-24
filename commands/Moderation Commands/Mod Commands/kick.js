const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "kick",
            memberName: "kick",
            aliases: [],
            examples: [`${client.commandPrefix}kick @user <reason here>`],
            description: "Kicks the user.",
            group: "mod",
            guildOnly: true,
            args: [
                {
                    key: "member",
                    prompt: "what member do you want me to kick?",
                    type: "member"
                },
                {
                    key: 'reason',
                    prompt: 'What is the reason for this kick?',
                    type: 'string',
                    default: "No Reason Provided"
                }
            ]
        })
    }
    async run(message, { member, reason }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "KICK_MEMBERS")) return;
        try{
        if (member.id === message.guild.ownerID) return message.say(`I can't kick the server owner.`)
        if (member.id === message.author.id) return message.say(`You can't kick yourself.`)
        if (member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That member is a Mod/Admin for the server!");
        let mod = message.author;
        let embed = new Discord.RichEmbed()
            .setColor(`#FF0000`)
            .setAuthor(`Member Kicked`, member.user.displayAvatarURL)
            .addField(`Kicked User`, `**Mention: **${member}\n **Tag: **${member.user.tag}\n **ID: **${member.id}`)
            .addField(`Kicked By`, `**Mention: **${mod}\n**ID: **${mod.id}`)
            .addField(`Reason`, reason)
            .setTimestamp()
            .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
        try{member.send(`${member.user}, You have been kicked from **${message.guild.name}** for: **${reason}**`)}catch(e){}
        await message.guild.members.get(member.id).kick(member.id).then(async () => {
            this.client.actionlog(this.client, message.guild, embed)
            message.delete().catch()
            await message.say(`${this.client.util.emojis.semoji}**${member.user.tag}** has been kicked.`).then(m => m.delete(15000).catch())
        })

    } catch(e) {
        this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
    }
}
