const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'prefix',
             memberName: 'prefix',
             aliases: [],
             examples: [`${client.commandPrefix}prefix`],
             description: 'Checks the prefix',
             group: 'info',
})
}
        async run(message) {
          this.client.stats(this.client, "cmd", null, null, null)
          try{
        if(message.guild){
        let settings = await this.client.db.findOne({guildID: message.guild.id}, (err, settings) => {settings})
        let embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setColor(`RANDOM`)
        .setDescription(`This server's prefix is ${settings.prefix ? settings.prefix : this.client.commandPrefix}`)
        if(message.member.hasPermission("MANAGE_MESSAGES")){
        embed.addField(`Note`, `To change the prefix do \`${settings.prefix ? settings.prefix : this.client.commandPrefix}setprefix newprefix\``)
        }
        message.channel.send(embed)
        }else{
          let embed = new Discord.RichEmbed()
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
            .setColor(`RANDOM`)
            .setDescription(`The bot's prefix is ${this.client.commandPrefix}`)
          message.channel.send(embed)
        }
          } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
          }
}
}