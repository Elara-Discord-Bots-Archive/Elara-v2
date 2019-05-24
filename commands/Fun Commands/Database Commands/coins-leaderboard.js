const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'leaderboard',
             memberName: 'leaderboard',
             aliases: [`lb`],
             examples: [`${client.commandPrefix}leaderboard`],
             description: 'Shows the coins leaderboard for the server.',
             guildOnly: true,
             group: 'fun'
})
}
        async run(message) {
this.client.stats(this.client, "cmd", null, null, null)
try{
  //Grab all of the users in said server
    this.client.dbcoins.find({guildID: message.guild.id}).sort([['coins', 'descending']]).exec((err, res) => {
    if (err) console.log(err);

    let embed = new Discord.RichEmbed()
      .setTitle("The Current Coins Leaders")
    //if there are no results
    let i;
    if (res.length === 0) {
      embed.setColor("#FF0000");
      embed.addField("No data found", "Please type in chat to gain coins!")
    } else if (res.length < 10) {
      //less than 10 results
      embed.setColor("RANDOM");
      for (i = 0; i < res.length; i++) {
        let member = message.guild.members.get(res[i].userID) || "User Left"
        if (member === "User Left") {
          embed.addField(`${i + 1}. ${member}`, `**Coins**: ${res[i].coins}`);
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**Coins**: ${res[i].coins}`);
        }
      }
    } else {
      //more than 10 results
      embed.setColor("BLURPLE");
      for (i = 0; i < 10; i++) {
        let member = message.guild.members.get(res[i].userID) || "User Left"
        if (member === "User Left") {
          embed.addField(`${i + 1}. ${member}`, `**Coins**: ${res[i].coins}`);
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**Coins**: ${res[i].coins}`);
        }
      }
    }

    message.channel.send(embed);
  })
} catch (e) {
  this.client.error(this.client, message, e)
  this.client.logger(this.client, message.guild, e.stack, message, message.channel)
}
}
}
