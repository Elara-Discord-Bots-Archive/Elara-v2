const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class LockDownCommand extends Command {
    constructor(client) {
        super(client, {
            name: "settings",
            memberName: "settings",
            aliases: [`conf`, "setting"],
            group: "admin",
            guildOnly: true,
            examples: [`${client.commandPrefix}settings`],
            description: "Shows you the current settings for the server",
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_GUILD")) return;
    try{
    this.client.db.findOne({guildID: message.guild.id}, async (err, db) => {
        if(!db) {
            return message.channel.send(`There is no database for this server, Please contact the bot owner!`)
        }else{
            let logchannel = await message.guild.channels.get(db.logchannel);
            if(!logchannel) logchannel = "None";
            let vclogs = await message.guild.channels.get(db.vclogs);
            if(!vclogs) vclogs = "None";
            let reports = await message.guild.channels.get(db.reportschannel);
            if(!reports) reports = "None";
            let action = await message.guild.channels.get(db.actionlog);
            if(!action) action = "None";
            let e = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL ? message.guild.iconURL : message.author.displayAvatarURL)
            .setColor(message.member.displayColor)
            .setTimestamp()
            .setTitle(`Current Settings`)
            .setDescription(`
            **Prefix: **${db.prefix ? db.prefix : `Default: ` + this.client.commandPrefix}
            **Log Channel: **${logchannel}
            **Action Log Channel: **${action}
            **Report Log Channel: **${reports}
            **Voice Log Channel: **${vclogs}
            **Event Modules: **
            - Server: ${db.toggles.server ? "Enabled" : "Disabled"}
            - Mod: ${db.toggles.mod ? "Enabled" : "Disabled"}
            - Messages: ${db.toggles.messages ? "Enabled": "Disabled"}
            - Joins: ${db.toggles.joins ? "Enabled": "Disabled"}
            - User: ${db.toggles.user ? "Enabled": "Disabled"}
            `)
            .addField(`Note`, `To enable/disable a module. Do \`${message.guild._commandPrefix ? message.guild._commandPrefix : this.client.commandPrefix}toggle <module> <enable/disable>\``)
            .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
            message.channel.send(e)
        }
    });  
    } catch (e) {
    this.client.error(this.client, message, e)
    this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
    }
}