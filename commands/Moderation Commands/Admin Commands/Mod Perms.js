const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class LockDownCommand extends Command {
    constructor(client) {
        super(client, {
            name: "modperm",
            memberName: "modperm",
            aliases: [],
            group: "admin",
            guildOnly: true,
            examples: [`${client.commandPrefix}modperm @role/roleid/name`],
            clientPermissions: ["MANAGE_ROLES"],
            description: "N/A",
            args: [
                {
                    key: 'role',
                    prompt: `Please provide a role to give Moderator permissions in this channel.`,
                    type: 'role'
                }
            ]
        })
    }
    async run(message, { role }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_GUILD")) return;
        try{
        message.delete(15000).catch()
        message.channel.overwritePermissions(role.id, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
            MANAGE_MESSAGES: true,
            EMBED_LINKS: true,
            ATTACH_FILES: true,
            ADD_REACTIONS: true,
            MANAGE_CHANNELS: false,
            CREATE_INSTANT_INVITE: true,
            MENTION_EVERYONE: false,
            READ_MESSAGE_HISTORY: true,
            USE_EXTERNAL_EMOJIS: true,
            SEND_TTS_MESSAGES: false,
            MANAGE_WEBHOOKS: false,
            MANAGE_ROLES_OR_PERMISSIONS: false

        }, [`Reason\n${message.author.tag} Has Given Mod Permissions to ${role.name} In ${message.channel.name}`]);
        const lockembed = new Discord.RichEmbed()
            .setColor(`#FF000`)
            .setDescription(`${message.author} I have given ${role} Mod Permissions in this channel.`)
            .setFooter(`This message will be deleted in 15 seconds..`)
        message.channel.send(lockembed).then(message => {
            message.delete(15000).catch()
        })
        } catch (e) {
        this.client.error(this.client, message, e)
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}