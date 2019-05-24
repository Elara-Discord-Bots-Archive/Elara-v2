const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "poll",
            memberName: "poll",
            aliases: [],
            examples: [`${client.commandPrefix}poll <#channel> <poll question here>`],
            description: "Posts a poll in the selected channel!",
            group: "mod",
            guildOnly: true,
            args: [
                {
                    key: "channel",
                    prompt: "What Channel do you want it to be posted in?",
                    type: "channel"

                },
                {
                    key: 'poll',
                    prompt: 'What is the poll going to be?`',
                    type: 'string',
                }
            ]
        })
    }
    async run(message, { channel, poll}) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_MESSAGES")) return;
        try{
        const embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(poll)
            .setTitle(`Poll`)
            .setFooter(`React to Vote!`)
        message.say(`Poll sent to ${channel}`).then(async msg => {
            msg.delete(15000).catch()
            message.delete(15000).catch()
            channel.send(embed).then(async message => {
                message.react(this.client.util.emojis.sreact)
                await message.react(this.client.util.emojis.nreact)
                
            })
        })
    } catch (e) {
        this.client.error(this.client, message, e);
    this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
    }
}