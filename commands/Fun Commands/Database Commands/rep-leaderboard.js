const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
const reps = require('../../../util/models/reps.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'repleaderboard',
             memberName: 'repleaderboard',
             aliases: [`rlb`,'replb'],
             examples: [`${client.commandPrefix}repleaderboard`],
             description: 'Shows the Reputation leaderboard.',
             group: 'fun'
})
}
        async run(message) {
          this.client.stats(this.client, "cmd", null, null, null)
try{
  reps.find().sort([["reps", "descending"]]).then(async res => {
    let embed = new Discord.RichEmbed()
    .setTitle("The Top 25 Reputation Leaders!")
    .setColor(`RANDOM`)
  // if there are no results
  let i;
  if(res.length > 25){
  for(i=0;i < 25;i++){
    embed.addField(`${i + 1}. ${res[i].userTag} (${res[i].userID})`, `${res[i].reps ? `**Reputation Points: **${res[i].reps}`: ""}`)
  }
}else{
  for(i=0;i<res.length;i++){
    embed.addField(`${i + 1}. ${res[i].userTag} (${res[i].userID})`, `${res[i].reps ? `**Reputation Points: **${res[i].reps}`: ""}`)
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
