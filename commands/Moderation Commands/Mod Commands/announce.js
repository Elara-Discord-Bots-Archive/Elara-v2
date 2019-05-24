const { Command } = require('../../../util/Commando');
const Discord = require('discord.js');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'announce',
            group: 'mod',
            memberName: 'announce',
            description: 'Sends a message to the channel',
            aliases: ["embed"],
            examples: [`${client.commandPrefix}announce #channel Hi there!`],
            guildOnly: true,
            args: [
                {
                    key: "channel",
                    prompt: "What channel do you want me to post the announcement to?",
                    type: "channel",
                    default: msg => msg.channel
                },
                {
                    key: 'content',
                    prompt: 'What would you like the content of the message to be?',
                    type: 'string'
                }
            ]
        });
    }

    async  run(msg, { channel, content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, msg, "MANAGE_MESSAGES")) return;
        try{
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription(content)
        channel.send(embed)
        msg.delete().catch()
        }catch(e){
            this.client.error(this.client, msg, e);
            this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
        }
    }
};