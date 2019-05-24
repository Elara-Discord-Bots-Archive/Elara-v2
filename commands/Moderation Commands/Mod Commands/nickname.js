const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "nick",
            memberName: "nick",
            aliases: ["nickname"],
            examples: [`${client.commandPrefix}nick @user <new nickname here>`],
            description: "Sets the nickname for the member you provide",
            group: "mod",
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
        if(this.client.perms(this.client, message, "MANAGE_NICKNAMES")) return;
        try{
    if(member.nickname === content) return message.channel.send(`That already is their nickname!`)
    if(member.id === message.guild.owner.id) return message.say(`I can't change the server owner's nickname!`)
    if(message.guild.me.highestRole.position < member.highestRole.position){
        return message.channel.send(`I don't have a role high enough to change that members nickname`)
    }

    member.setNickname(content).catch(e =>{
        this.client.error(this.client, message, e);
    })
    await message.channel.send(`${this.client.util.emojis.semoji} ${member.user.username}'s nickname has been changed to ${content}`)
    } catch (e) {
        this.client.error(this.client, message, e);
    this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
}
}