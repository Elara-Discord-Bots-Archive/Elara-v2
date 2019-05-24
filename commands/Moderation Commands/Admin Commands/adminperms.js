const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class LockDownCommand extends Command {
    constructor(client) {
        super(client, {
            name: "adminperm",
            memberName: "adminperm",
            aliases: [],
            group: "admin",
            guildOnly: true,
            examples: [`${client.commandPrefix}adminperm <Role Name/ID here>`],
            description: "Gives Admin permissions to the role for the command you run the command in. ",
            args: [
                {
                    key: 'role',
                    prompt: `Please provide a role to give Admin Permissions in this channel?.`,
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
            MANAGE_CHANNELS: true,
            CREATE_INSTANT_INVITE: true,
            MENTION_EVERYONE: true,
            READ_MESSAGE_HISTORY: true,
            USE_EXTERNAL_EMOJIS: true,
            SEND_TTS_MESSAGES: true,
            MANAGE_WEBHOOKS: true,
            MANAGE_ROLES_OR_PERMISSIONS: true

        }, [`Reason\n${message.author.tag} Has Given Admin Permissions to ${role.name} In ${message.channel.name}`]);
        message.react(this.client.util.emojis.sreact)
    } catch (e) {
        this.client.error(this.client, message, e)
    this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
    }
}