const { Command } = require('../../../util/Commando');
const Discord = require('discord.js');
const moment = require('moment')
require('moment-duration-format')
module.exports = class BotinfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: "botinfo",
            group: "info",
            memberName: "botinfo",
            aliases: [`info`, `binfo`],
            description: "Gives you the bots information",
            examples: [`${client.commandPrefix}botinfo`]
        })

    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let prefix = this.client.commandPrefix;
        let bot = this.client.user;
        let botembed = new Discord.RichEmbed()
            .setTitle(`Bot Information`)
            .setAuthor(bot.tag, bot.displayAvatarURL)
            .setColor(`RANDOM`)
            .setThumbnail(this.client.user.displayAvatarURL)
            .addField(`User Info`, `
            **User: ** ${bot}
            **Tag: **${bot.tag}
            **ID: **${bot.id}
            **Discriminator: **#${bot.discriminator}
            **Avatar: **[Click Here](${bot.displayAvatarURL})
            **Created At: **${moment(this.client.user.createdAt).format('MMMM Do YYYY')}`, false)
            .addField(`Info`, `
            **Prefixes:** ${prefix}, ${this.client.user}
            **Mutual Servers: **${this.client.guilds.filter(g => g.members.get(message.author.id)).size}
            **Server List: ** Do \`${prefix}servers\`
            **Stats: ** Do \`${prefix}stats\`
            **Bot Owners: **\n${this.client.owners.map(c => c).join('\n')}`, true)
            .addField(`Links`, `
            [Invite](https://elara.page.link/Invite)
            [Support Server](https://elara.page.link/Support)
            [Github](https://elara.page.link/github)
            [DBL](https://elara.page.link/DBL)
            `, true)
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL)
        message.say(botembed)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}