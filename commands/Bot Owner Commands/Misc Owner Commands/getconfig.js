const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'get-config',
             memberName: 'get-config',
             aliases: [`gc`],
             examples: [`${client.commandPrefix}get-config <Guild ID>`],
             description: 'Gets the servers configurations, Log channels etc',
             group: 'owner',
             ownerOnly: true,
             args: [
                 {
                     key: "id",
                     prompt: "What server do you want the config settings from?",
                     type: "string"
                 }
             ]
})
}
        async run(message, {id}) {
            this.client.stats(this.client, "cmd", null, null, null)
            try{
            let server = this.client.guilds.get(id)
            let db = await this.client.db.findOne({guildID: server.id}, async(err, settings) => {settings})
            let logchannel = await this.client.channels.get(db.logchannel);
            if(!logchannel) logchannel = "None";
            let vclogs = await this.client.channels.get(db.vclogs);
            if(!vclogs) vclogs = "None";
            let reports = await this.client.channels.get(db.reportschannel);
            if(!reports) reports = "None";
            let action = await this.client.channels.get(db.actionlog);
            if(!action) action = "None";
              let embed = new Discord.RichEmbed()
              .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
              .setAuthor(server.name, server.iconURL)
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
              message.channel.send(embed)
            } catch (e) {
                message.say(`ERROR:\n${e}`)
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
            }
}
}
