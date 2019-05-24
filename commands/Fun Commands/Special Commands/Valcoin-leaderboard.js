const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
const vcoins = require('../../../util/models/VALCOINS.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'vleaderboard',
             memberName: 'vleaderboard',
             aliases: [`vlb`, `vhlb`],
             examples: [`${client.commandPrefix}vlb`],
             description: 'Checks the Heartagrams Leaderboard',
             throttling: {
            usages: 1,
            duration: 5
            },
             group: 'special'
})
}
        async run(message) {
            this.client.stats(this.client, "cmd", null, null, null)
            try{
        vcoins.find().sort([["vcoins", "descending"]]).then(async res => {
            let embed = new Discord.RichEmbed()
            .setTitle("The Top 25 Heartagram Leaders.")
            .setColor(`RANDOM`)
          // if there are no results
          let i;
          if(res.length > 25){
          for(i=0;i < 25;i++){
            embed.addField(`${i + 1}. ${res[i].userTag} (${res[i].userID})`, `${res[i].vcoins ? `**Heartagrams: **${res[i].vcoins} <a:Heartagram:520544378104709120>`: "**Heartagrams: **0 <a:Heartagram:520544378104709120>"}`)
          }
        }else{
          for(i=0;i<res.length;i++){
            embed.addField(`${i + 1}. ${res[i].userTag} (${res[i].userID})`, `${res[i].vcoins ? `**Heartagrams: **${res[i].vcoins} <a:Heartagram:520544378104709120>`: "**Heartagrams: **0 <a:Heartagram:520544378104709120>"}`)
          }
        }
        
          message.channel.send(embed);
          });
    
            } catch (e) {
                this.client.error(this.client, message, e)
                this.client.logger(this.client, message.guild, e.stack, message, message.channel)
            }
}
}
