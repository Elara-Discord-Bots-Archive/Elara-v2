const { Command } = require('../../../util/Commando');
const Discord = require('discord.js');
const moment = require('moment')
require('moment-duration-format');
module.exports = class UPCommand extends Command {
    constructor(client) {
        super(client, {
            name: "uptime",
            memberName: "uptime",
            aliases: [],
            group: "info",
            examples: [`${client.commandPrefix}uptime`],
            description: "Tells you how long the bot has been online.",

        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
            .addField(`Uptime`, moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]"))
        message.say(embed)
        } catch (e) {
            this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}