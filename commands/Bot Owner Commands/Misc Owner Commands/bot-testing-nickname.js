const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "n",
            memberName: "n",
            aliases: [],
            examples: [`${client.commandPrefix}n @user <new nickname here>`],
            description: "Sets the nickname for the member you provide",
            group: "owner",
            guildOnly: true,
            args: [
                {
                    key: "member",
                    prompt: "what member do you want me to change the nickname of?",
                    type: "member"
                },
                {
                    key: 'content',
                    prompt: 'What nickname do you want to set for that member?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { member, content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.owner(this.client, message)) return;
        try{
            member.setNickname(`[${content}] ${member.user.username}`, `Updated By: ${message.author.tag} (${message.author.id})`)
            await message.react(this.client.util.emojis.sreact)
    } catch (e) {
        message.channel.send(`ERROR:\n${e}`)
    this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
}
}