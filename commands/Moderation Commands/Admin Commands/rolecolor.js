const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "rolecolor",
            memberName: "rolecolor",
            aliases: [],
            examples: [`${client.commandPrefix}rolecolor <role name/mention or id here> <new color here>`],
            description: "Changes the role color of the role you choose.",
            group: "admin",
            guildOnly: true,
            args: [
                {
                    key: "role",
                    prompt: "What role do you want to change the role color of?",
                    type: "role"
                },
                {
                    key: 'color',
                    prompt: 'What role do you want the role to be?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { role, color }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_ROLES")) return;
        try{
        await role.setColor(color).catch(error => message.channel.send(`Error: ${error}`));
        let e = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setDescription(`${role} role color is now ${role.hexColor} (${role.color})`)
        .setTimestamp()
        .setColor(role.hexColor)
        message.channel.send(e)
        } catch (e) {
        this.client.error(this.client, message, e)
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}