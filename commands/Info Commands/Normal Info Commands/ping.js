const { Command } = require('../../../util/Commando');
const Discord = require('discord.js');
const moment = require('moment');
module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            group: 'info',
            memberName: 'ping',
            description: 'Shows the ping for the bot',
            examples: ['ping'],
            aliases: ["pong", "pung"],
            guildOnly: false
        });
    }

    async run(msg) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let loadingembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription(`${this.client.util.emojis.eload} Loading.`)
            .setTimestamp()
        const message = await msg.channel.send(loadingembed);
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`${this.client.util.emojis.robot} Status ${this.client.util.emojis.robot}`)
            .setFooter(msg.author.tag, msg.author.displayAvatarURL)
            .addField(`Message Latency`, `${message.createdTimestamp - msg.createdTimestamp}ms`, true)
            .addField(`API Latency`, `${Math.round(this.client.ping)}ms`, true)
            .addField(`Uptime`, `${moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")}`, true)
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
        message.edit(embed);
        }catch(e){
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
};