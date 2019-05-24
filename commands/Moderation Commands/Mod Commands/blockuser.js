const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class LockDownCommand extends Command {
    constructor(client) {
        super(client, {
            name: "block",
            memberName: "block",
            aliases: ["bl"],
            group: "mod",
            guildOnly: true,
            clientPermissions: ["MANAGE_ROLES"],
            examples: [`${client.commandPrefix}block <username/mention/userid>`],
            description: "Removes the send messages permission for the user you give.",
            args: [
                {
                    key: 'member',
                    prompt: `Please provide a member to blacklist from this channel.`,
                    type: 'member'
                }
            ]
        })
    }
    async run(message, { member }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_MESSAGES")) return;
        try{
        if(message.author.id === member.id) return message.channel.send(`You can't block yourself from using this channel.`).then(m => m.delete(10000).catch())
        message.delete(15000).catch()
        message.channel.overwritePermissions(member.id, {SEND_MESSAGES: false}, {reason: [`${message.author.tag} Has blacklisted ${member.user.tag} From ${message.channel.name}`]});
        const lockembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription(`${message.author} blocked ${member} from using this channel.`)
            .setFooter(`This message will be deleted in 15 seconds..`)
        message.channel.send(lockembed).then(message => {
            message.delete(15000).catch()
        })
        } catch (e) {
            this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}