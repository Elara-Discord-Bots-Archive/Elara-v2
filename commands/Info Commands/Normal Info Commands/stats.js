const { Command } = require('../../../util/Commando');
const moment = require("moment");
require("moment-duration-format");
const Discord = require('discord.js')
const cpuStat = require('cpu-stat');
const Stats = require('../../../util/models/stats.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "stats",
            memberName: "stats",
            aliases: [],
            examples: [`${client.commandPrefix}stats`],
            description: "Gives you the stats for the bot",
            group: "info",
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if(message.guild){
        let settings = await this.client.db.findOne({guildID: message.guild.id}, async(err, settings) => {settings})
        let stat = await Stats.findOne({ clientID: this.client.user.id }, async (err, db) => { db })
        message.channel.startTyping(true)
        let pl = {
            "win32": "Windows",
            "linux": "Linux",
            "darwin": "Darwin",
            "undefined": "Undefined"
        }
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setThumbnail(this.client.user.displayAvatarURL)
            .addField(`System Info`, `
            **CPU: **${cpuStat.totalCores()} Cores ${cpuStat.avgClockMHz()}MHz
            **Memory Used: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
            **Operating System: **${pl[process.platform]}`)

            .setAuthor(`${this.client.user.tag}`, this.client.user.displayAvatarURL)
            .addField(`Info`, `
            **Ping: **${Math.round(this.client.ping)}ms
            **Uptime: **${moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")}
            **Servers: **${this.client.guilds.size}\n**Users: **${this.client.users.size}
            **Channels: **${this.client.channels.size}
            **Emojis: **${this.client.emojis.size}
            **Stats: **
             - Commands Used: ${stat.cmdrun}
             `, true)
        if(this.client.isOwner(message.author.id)){
            embed.addField(`Dev Stats`, `
            **Servers Joined: **${stat.guildsjoin}
            **Servers Left: **${stat.guildsleft}
            **Starts: **${stat.starts}
            **Restarts: **${stat.restarts}
            **Shutdowns: **${stat.shutdowns}
            `, true)
        }
        if(message.member.hasPermission("MANAGE_GUILD") || this.client.isOwner(message.author.id)){
            embed.addField(`Settings`, `Do \`${message.guild._commandPrefix ? message.guild._commandPrefix : this.client.commandPrefix}settings\` to view the current settings!`)
        }
        message.say(embed).then(message.channel.stopTyping(true))
        }else{
            let stat = await Stats.findOne({ clientID: this.client.user.id }, async (err, db) => { db })
            message.channel.startTyping(true)
            let pl = {"win32": "Windows", "linux": "Linux", "darwin": "Darwin", "undefined": "Undefined"}
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setThumbnail(this.client.user.displayAvatarURL)
            .addField(`System Info`, `
            **CPU: **${cpuStat.totalCores()} Cores ${cpuStat.avgClockMHz()}MHz
            **Memory Used: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
            **Operating System: **${pl[process.platform]}`)

            .setAuthor(`${this.client.user.tag}`, this.client.user.displayAvatarURL)
            .addField(`Info`, `
            **Ping: **${Math.round(this.client.ping)}ms
            **Uptime: **${moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")}
            **Servers: **${this.client.guilds.size}\n**Users: **${this.client.users.size}
            **Channels: **${this.client.channels.size}\n**Emojis: **${this.client.emojis.size}
            **Stats: **
             - Commands Used: ${stat.cmdrun}
            `)
        message.say(embed).then(message.channel.stopTyping(true))
        }
    }catch(e){
        this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
    }
}
