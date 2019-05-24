const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
const superagent = require('superagent');
const moment = require('moment');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'status',
             memberName: 'status',
             aliases: [],
             examples: [`${client.commandPrefix}status`],
             description: `Checks discord's status`,
             group: 'info'
})
}
        async run(message) {
          this.client.stats(this.client, "cmd", null, null, null)
          try{
        let {body} = await superagent.get(this.client.config.status);
        let un = await  superagent.get(this.client.config.unstatus)
           let e = new Discord.RichEmbed()
           .setColor(`RANDOM`)
           .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
           .setTimestamp()
           .setAuthor(body.page.name, "https://cdn.discordapp.com/emojis/483118381650804747.gif?v=1")
           .addField(`Status Page`, body.page.url)
           .addField(`Last Updated`, moment(body.page.updated_at).format("dddd, MMMM Do YYYY"))
           if(un.body.incidents.length !== 0){
            e.addField(`Issue`, un.body.incidents[0].name, false)
            e.addField(`Status`, un.body.incidents[0].status, true)
            e.addField(`Started At`, moment(un.body.incidents[0].created_at).format("dddd, MMMM Do YYYY"), true)
            e.addField(`Impact`, un.body.incidents[0].impact, true)
            e.addField(`Full Issue`, `[Click Here](${un.body.incidents[0].shortlink})`, true)
          let res = await un.body.incidents[0].incident_updates;
          res.forEach(c => {
            e.addField(`Update`, `**Status: **${c.status}\n${c.body}`)
          })
           }else{
           e.addField(`Status`, `**Indicator: **${body.status.indicator}\n**Description: **${body.status.description}`)
           }
           message.channel.send(e)
          } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
          }
}
}