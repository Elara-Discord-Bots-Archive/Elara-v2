const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'report',
             memberName: 'report',
             aliases: [],
             examples: [`${client.commandPrefix}report @user reason here`],
             description: 'Reports the user you mention to the servers staff',
             group: 'server',
             guildOnly: true,
             args: [
                 {
                     key: "member",
                     prompt: "What member do you want to report?",
                     type: "member"
                 },
                 {
                     key: "reason",
                     prompt: "What is the reason for this report?",
                     type: "string"
                 }
             ]
})
}
        async run(message, {member, reason}) {
            this.client.stats(this.client, "cmd", null, null, null)
            try{
        this.client.db.findOne({guildID: message.guild.id}, async (err, settings)  => {
            if(!settings.reportschannel){
                let e  = new Discord.RichEmbed()
                .setColor(`#FF0000`)
                .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
                .setDescription(`This server doesn't have a reports channel set!`)
                .addField(`Note`, `To add one do \`${this.client.commandPrefix}reportslog #channel\``)
                .setTitle(`ERROR`)
                return message.channel.send(e)
            }else{
                let reportEmbed = new Discord.RichEmbed()
                    .setTitle("Reason")
                    .setColor("RANDOM")
                    .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
                    .setTimestamp()
                    .setAuthor(`User Reported`, message.author.displayAvatarURL)
                    .addField(`Info`, `**Reported User: **${member} (${member.id})\n**Reported By: **${message.author} (${message.author.id})\n**Channel: **${message.channel} (${message.channel.id})`)
                    .setDescription(reason)
                let dmEmbed = new Discord.RichEmbed()
                    .setTitle("Reason")
                    .setDescription(reason)
                    .setAuthor(`Your Report`, message.author.displayAvatarURL)
                    .setColor("RANDOM")
                    .addField(`Info`, `**Reported User: **${member}\n**Server: **${message.guild.name}`)
                    .setTimestamp()
                message.delete().catch();
                this.client.channels.get(settings.reportschannel).send(reportEmbed);
                message.author.send(dmEmbed);
            }
        });
        } catch (e) {
            this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
}
}