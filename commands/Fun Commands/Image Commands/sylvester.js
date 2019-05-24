const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'sylvester',
             memberName: 'sylvester',
             aliases: [],
             examples: [`${client.commandPrefix}sylvester`],
             description: 'Posts a random sylvester cat photo',
             group: 'image'
})
}
        async run(message) {
          this.client.stats(this.client, "cmd", null, null, null)
          try{
        let random = Math.floor(Math.random() * this.client.photos.sylvester.length);
           let e = new Discord.RichEmbed()
           .setColor(`RANDOM`)
           .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
           .setTimestamp()
           .setImage(this.client.photos.sylvester[random])
           .setDescription(`Sylvester!!! :heart:`)
           message.channel.send(e)
          }catch(e){
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
          }
}
}