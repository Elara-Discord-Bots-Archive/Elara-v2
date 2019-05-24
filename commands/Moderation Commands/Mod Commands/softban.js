const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "softban",
            memberName: "softban",
            aliases: [`sb`],
            examples: [`${client.commandPrefix}softban @user <reason here>`],
            description: "Bans and unbans the member you provide",
            group: "mod",
            guildOnly: true,
            clientPermissions: ["BAN_MEMBERS"],
            args: [
                {
                    key: "member",
                    prompt: "what member do you want me to softban?",
                    type: "member"
                },
                {
                    key: 'reason',
                    prompt: 'What is the reason for this softban?',
                    type: 'string',
                    default: "No Reason Provided"
                }
            ]
        })
    }
    async run(message, { member, reason }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "BAN_MEMBERS")) return;
        try{
        if (member.user.id === message.author.id) return message.say(`You can't softban yourself :face_palm: `)
        if (member.hasPermission("MANAGE_MESSAGES")) return message.say(`I can't softban another staff member.`)

        let embed = new Discord.RichEmbed()
            .setTitle(`Member Softbanned`)
            .setColor("#FF0000")
            .setDescription(`**Member: **${member} \`${member.user.tag}\` (${member.user.id})\n**Moderator: **${message.author} \`${message.author.tag}\` (${message.author.id})`)
            .addField("Reason", reason)
            .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
        await message.guild.ban(member.user.id).then(async () => {
            await message.guild.unban(member.user.id)
            await message.channel.send(`${this.client.util.emojis.semoji} ${member} has been softbanned`)
        });
        message.delete().catch();
        this.client.actionlog(this.client, message.guild, embed)
        } catch (e) {
            this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}